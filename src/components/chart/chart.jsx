import React from 'react';
import {connect} from 'react-redux';
import {orderBy, findIndex} from 'lodash';
import CanvasJSReact from '../../assets/canvasjs.react';

import Spinner from '../spinner';

import './chart.css';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const byDenominationSlice = (curr) => {
    const currSort = orderBy(curr, ['rDate'], ['asc']);
    const fD = findIndex(currSort, (item) => item.date === '31.12.1999');
    const sD = findIndex(currSort, (item) => item.date === '30.06.2016');
    const fOpt = currSort.slice(0, fD + 1).map((item) => {
        return {y: item.rate, label: item.date}
    });
    const sOpt = currSort.slice(fD + 1, sD + 1).map((item) => {
        return {y: item.rate, label: item.date}
    });
    const tOpt = currSort.slice(sD + 1).map((item) => {
        return {y: item.rate, label: item.date}
    });
    return {fOpt, sOpt, tOpt};
};

const Chart = ({loading, options}) => {
    const chart = loading ? <div className='spinner-chart'><Spinner/></div> : options ?
        <>{options.map((option) => <div key={option} className='chart'><CanvasJSChart options={option}/>
        </div>)}</> : null;
    return (
        <>
            {chart}
        </>
    );
};

const mapStateToProps = ({loading, USD, GBP, CHF}) => {
    if (!USD || !GBP || !CHF) return {loading, options: null};
    const options = [];
    const {fOpt: fOptU, sOpt: sOptU, tOpt: tOptU} = byDenominationSlice(USD);
    const {fOpt: fOptG, sOpt: sOptG, tOpt: tOptG} = byDenominationSlice(GBP);
    const {fOpt: fOptC, sOpt: sOptC, tOpt: tOptC} = byDenominationSlice(CHF);
    if (fOptU.length) {
        options.push({
            animationEnabled: true,
            title: {
                text: 'Currency chart by 01.01.2000'
            },
            axisY: {
                title: 'BYB',
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
                    dataPoints: [...fOptG]
                },
                {
                    type: 'spline',
                    name: 'CHF',
                    showInLegend: true,
                    dataPoints: [...fOptC]
                },
                {
                    type: 'spline',
                    name: 'USD',
                    showInLegend: true,
                    dataPoints: [...fOptU]
                },
            ]
        });
    }
    if (sOptU.length) {
        options.push({
            animationEnabled: true,
            title: {
                text: 'Currency chart by 01.07.2016'
            },
            axisY: {
                title: 'BYR',
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
                    dataPoints: [...sOptG]
                },
                {
                    type: 'spline',
                    name: 'CHF',
                    showInLegend: true,
                    dataPoints: [...sOptC]
                },
                {
                    type: 'spline',
                    name: 'USD',
                    showInLegend: true,
                    dataPoints: [...sOptU]
                },
            ]
        });
    }
    if (tOptU.length) {
        options.push({
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
                    dataPoints: [...tOptG]
                },
                {
                    type: 'spline',
                    name: 'CHF',
                    showInLegend: true,
                    dataPoints: [...tOptC]
                },
                {
                    type: 'spline',
                    name: 'USD',
                    showInLegend: true,
                    dataPoints: [...tOptU]
                },
            ]
        });
    }
    return {loading, options};
};

export default connect(mapStateToProps, null)(Chart);
