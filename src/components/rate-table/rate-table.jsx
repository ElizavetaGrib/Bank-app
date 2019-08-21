import React from 'react';

import RateTableItem from '../rate-table-item';

import './rate-table.css';

const RateTable = ({data}) => {
    return (
        <table className='currency-table'>
            <thead className='table-header'>
            <tr>
                <th>Date</th>
                <th>Br/USD</th>
                <th>Br/GBP</th>
                <th>Br/CHF</th>
            </tr>
            </thead>
            <tbody className='table-body'>
            {
                data.map((rate) => {
                    return (
                        <RateTableItem key={rate.date} rate={rate}/>
                    );
                })
            }
            </tbody>
        </table>
    );
};

export default RateTable;
