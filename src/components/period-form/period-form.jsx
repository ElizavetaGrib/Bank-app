import React, {Component} from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import ReactLightCalendar from '@lls/react-light-calendar';

import {withBankService} from '../hoc';
import {ratesLoaded, loading} from '../../actions';

import '@lls/react-light-calendar/dist/index.css';

import './period-form.css';

class PeriodForm extends Component {

    state = {
        startDate: new Date().getTime(),
        endDate: null,
    };

    onSubmit = (e) => {
        e.preventDefault();
        const {bankService, ratesLoaded, loading} = this.props;

        loading();

        const sD = new Date(this.state.startDate);
        const eD = this.state.endDate ? new Date(this.state.endDate) : sD;

        Promise.all([
            bankService.getUSD(sD, eD),
            bankService.getGBP(sD, eD),
            bankService.getCHF(sD, eD)
        ]).then((data) => ratesLoaded(data));
    };

    onChange = (startDate, endDate) => this.setState({startDate, endDate});

    render() {
        const {startDate, endDate} = this.state;

        return (
            <form className='period-form'
                  onSubmit={this.onSubmit}>
                <ReactLightCalendar className='calendar'
                                    startDate={startDate}
                                    endDate={endDate}
                                    onChange={this.onChange}
                                    disableDates={(date) => date < new Date('1995-03-29') || date > new Date().setDate(new Date().getDate() + 1)}
                />
                <input className='submit'
                       type='submit'
                       value='Get rates'/>
            </form>
        );
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        loading: () => dispatch(loading()),
        ratesLoaded: (data) => dispatch(ratesLoaded({USD: data[0], GBP: data[1], CHF: data[2]})),
    };
};

export default compose(
    withBankService(),
    connect(null, mapDispatchToProps)
)(PeriodForm);
