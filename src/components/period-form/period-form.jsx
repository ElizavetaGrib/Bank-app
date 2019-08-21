import React, {Component} from 'react';
import {connect} from 'react-redux';
import ReactLightCalendar from '@lls/react-light-calendar';

import {compose} from '../../utils';
import {withBankService} from '../hoc';
import {rateLoaded, loading} from '../../actions';

import '@lls/react-light-calendar/dist/index.css';

import './period-form.css';

class PeriodForm extends Component {

    state = {
        startDate: new Date().getTime(),
        endDate: null,
    };

    onSubmit = (e) => {
        e.preventDefault();
        const {bankService, rateLoaded, loading} = this.props;

        loading();

        const sD = new Date(this.state.startDate);
        const eD = this.state.endDate ? new Date(this.state.endDate) : sD;

        Promise.all([
            bankService.getUSD(sD, eD),
            bankService.getGBP(sD, eD),
            bankService.getCHF(sD, eD)
        ]).then((data) => rateLoaded(data));
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
        rateLoaded: (data) => dispatch(rateLoaded({USD: data[0], GBP: data[1], CHF: data[2]})),
    };
};

export default compose(
    withBankService(),
    connect(null, mapDispatchToProps)
)(PeriodForm);
