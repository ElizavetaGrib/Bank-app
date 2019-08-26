import React from 'react';

import './rate-table-item.css';

const RateTableItem = ({rate}) => {
    const {date, USD, GBP, CHF} = rate;

    return (
        <tr>
            <td>{date}</td>
            <td>{USD}</td>
            <td>{GBP}</td>
            <td>{CHF}</td>
        </tr>
    );
};

export default RateTableItem;
