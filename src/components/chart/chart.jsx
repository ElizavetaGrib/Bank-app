import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import CanvasJSReact from '../../assets/canvasjs.react';

import Spinner from '../spinner';

import './chart.css';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Chart = ({loading, options}) => {
    const chart = loading ? <div className='spinner-chart'><Spinner/></div> : options ?
        <div className='chart'><CanvasJSChart options={options}/></div> : null;
    return (
        <>
            {chart}
        </>
    );
};

const mapStateToProps = ({loading, USD, GBP, CHF}) => {
    if (!USD || !GBP || !CHF) return {loading, options: null};
    const usdOptions = _.orderBy(USD, ['rDate'], ['asc']).map((item) => {
        return {y: item.rate, label: item.date};
    });
    const gbpOptions = _.orderBy(GBP, ['rDate'], ['asc']).map((item) => {
        return {y: item.rate, label: item.date};
    });
    const chfOptions = _.orderBy(CHF, ['rDate'], ['asc']).map((item) => {
        return {y: item.rate, label: item.date};
    });
    const options = {
        animationEnabled: true,
        title: {
            text: 'Currency chart'
        },
        axisY: {
            title: 'BYN',
            includeZero: false
        },
        axisX: {
            title: 'Date',
            includeZero: false
        },
        toolTip: {
            shared: true
        },
        data: [
            {
                type: 'spline',
                name: 'GBP',
                showInLegend: true,
                dataPoints: [...gbpOptions]
            },
            {
                type: 'spline',
                name: 'CHF',
                showInLegend: true,
                dataPoints: [...chfOptions]
            },
            {
                type: 'spline',
                name: 'USD',
                showInLegend: true,
                dataPoints: [...usdOptions]
            },
        ]
    };
    return {loading, options};
};

export default connect(mapStateToProps, null)(Chart);
