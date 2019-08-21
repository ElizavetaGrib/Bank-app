import React from 'react';
import {connect} from 'react-redux';
import {find, orderBy} from 'lodash';

import Spinner from '../spinner';
import RateTable from '../rate-table';

const RateTableContainer = ({loading, data}) => {
    const rates = loading ? <Spinner/> : data ? <RateTable data={data}/> : null;

    return (
        <>
            {rates}
        </>
    );
};

const mapStateToProps = ({loading, USD, GBP, CHF}) => {
    let data = null;
    if (USD && GBP && CHF) {
        data = [];
        USD.forEach((usd) => {
            data = [...data, {
                rDate: usd.rDate,
                date: usd.date,
                USD: usd.rate,
                GBP: find(GBP, ['date', usd.date]).rate,
                CHF: find(CHF, ['date', usd.date]).rate
            }];
        });
        data = orderBy(data, ['rDate'], ['asc']);
    }
    return {loading, data};
};

export default connect(mapStateToProps, null)(RateTableContainer);
