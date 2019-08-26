import React from 'react';
import {connect} from 'react-redux';
import {find, orderBy} from 'lodash';

import Spinner from '../spinner';
import RateTable from '../rate-table';

const RateTableContainer = ({loading, data}) => {
    if (loading) {
        return (
            <Spinner/>
        );
    } else if (data) {
        return (
            <RateTable data={data}/>
        );
    }
    return null;
};

const mapStateToProps = ({loading, USD, GBP, CHF}) => {
    let data = null;
    if (USD && GBP && CHF) {
        data = [];
        USD.forEach((usd) => {
            data.push({
                msDate: usd.msDate,
                date: usd.date,
                USD: usd.rate,
                GBP: find(GBP, ['date', usd.date]).rate,
                CHF: find(CHF, ['date', usd.date]).rate,
            });
        });
        data = orderBy(data, ['msDate'], ['asc']);
    }
    return {loading, data};
};

export default connect(mapStateToProps, null)(RateTableContainer);
