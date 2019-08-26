import React from 'react';
import {connect} from 'react-redux';
import {orderBy, findIndex} from 'lodash';
import CanvasJSReact from '../../assets/canvasjs.react';

import Spinner from '../spinner';

import './chart.css';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const byRedenominationSlice = (currency) => {
    const sortedCurrency = orderBy(currency, ['msDate'], ['asc']);
    const firstRedenominatonIndex = findIndex(sortedCurrency, (item) => item.date === '31.12.1999');
    const secondRedenominationIndex = findIndex(sortedCurrency, (item) => item.date === '30.06.2016');
    const firstChartData = sortedCurrency.slice(0, firstRedenominatonIndex + 1).map((item) => {
        return {y: item.rate, label: item.date};
    });
    const secondChartData = sortedCurrency.slice(firstRedenominatonIndex + 1, secondRedenominationIndex + 1).map((item) => {
        return {y: item.rate, label: item.date};
    });
    const thirdChartData = sortedCurrency.slice(secondRedenominationIndex + 1).map((item) => {
        return {y: item.rate, label: item.date};
    });
    return {firstChartData, secondChartData, thirdChartData};
};

const Chart = ({loading, options}) => {
    if (loading) {
        return (
            <div className='spinner-chart'>
                <Spinner/>
            </div>
        );
    } else if (options) {
        return (
            <>
                {
                    options.map((option) => {
                        return (<div className='chart'
                                     key={option.title.text}>
                            <CanvasJSChart options={option}/>
                        </div>);
                    })
                }
            </>
        );
    }
    return null;
};

const mapStateToProps = ({loading, USD, GBP, CHF}) => {
    if (!USD || !GBP || !CHF)
        return {loading, options: null};
    const options = [];
    const {firstChartData: firstDataUSD, secondChartData: secondDataUSD, thirdChartData: thirdDataUSD} = byRedenominationSlice(USD);
    const {firstChartData: firstDataGBP, secondChartData: secondDataGBP, thirdChartData: thirdDataGBP} = byRedenominationSlice(GBP);
    const {firstChartData: firstDataCHF, secondChartData: secondDataCHF, thirdChartData: thirdDataCHF} = byRedenominationSlice(CHF);
    if (firstDataUSD.length) {
        options.push({
            title: {
                text: 'Currency chart up to 01.01.2000'
            },
            data: [
                {
                    name: 'GBP',
                    dataPoints: [...firstDataGBP],
                    type: 'spline',
                    showInLegend: true,
                },
                {
                    name: 'CHF',
                    dataPoints: [...firstDataCHF],
                    type: 'spline',
                    showInLegend: true,
                },
                {
                    name: 'USD',
                    dataPoints: [...firstDataUSD],
                    type: 'spline',
                    showInLegend: true,
                },
            ],
            axisX: {
                title: 'Date',
                includeZero: false,
            },
            axisY: {
                title: 'BYB',
                includeZero: false,
            },
            toolTip: {
                shared: true,
            },
            animationEnabled: true,
        });
    }
    if (secondDataUSD.length) {
        options.push({
            title: {
                text: 'Currency chart up to 01.07.2016',
            },
            data: [
                {
                    name: 'GBP',
                    dataPoints: [...secondDataGBP],
                    type: 'spline',
                    showInLegend: true,
                },
                {
                    name: 'CHF',
                    dataPoints: [...secondDataCHF],
                    type: 'spline',
                    showInLegend: true,
                },
                {
                    name: 'USD',
                    dataPoints: [...secondDataUSD],
                    type: 'spline',
                    showInLegend: true,
                },
            ],
            axisX: {
                title: 'Date',
                includeZero: false,
            },
            axisY: {
                title: 'BYR',
                includeZero: false,
            },
            toolTip: {
                shared: true,
            },
            animationEnabled: true,
        });
    }
    if (thirdDataUSD.length) {
        options.push({
            title: {
                text: 'Currency chart',
            },
            data: [
                {
                    name: 'GBP',
                    dataPoints: [...thirdDataGBP],
                    type: 'spline',
                    showInLegend: true,
                },
                {
                    name: 'CHF',
                    dataPoints: [...thirdDataCHF],
                    type: 'spline',
                    showInLegend: true,
                },
                {
                    name: 'USD',
                    dataPoints: [...thirdDataUSD],
                    type: 'spline',
                    showInLegend: true,
                },
            ],
            axisX: {
                title: 'Date',
                includeZero: false,
            },
            axisY: {
                title: 'BYN',
                includeZero: false,
            },
            toolTip: {
                shared: true,
            },
            animationEnabled: true,
        });
    }
    return {loading, options};
};

export default connect(mapStateToProps, null)(Chart);
