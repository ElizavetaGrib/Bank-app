import React from 'react';

import PeriodForm from '../period-form';
import RateTableContainer from '../rate-table-container';
import Chart from '../chart';

import './app.css';

const App = () => {
    return (
        <>
            <div className='form-table-container'>
                <PeriodForm/>
                <RateTableContainer/>
            </div>
            <Chart/>
        </>
    );
};

export default App;
