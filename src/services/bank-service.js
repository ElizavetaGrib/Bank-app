import {differenceInYears, addDays} from 'date-fns';
import {concat} from 'lodash';

export default class BankService {

    _apiBase = 'https://www.nbrb.by/API/ExRates/Rates/Dynamics/';

    _currencyIDs = {
        CHF: 130,
        GBP: 143,
        USD: 145,
    };

    _currencyNames = {
        130: 'CHF',
        143: 'GBP',
        145: 'USD',
    };

    _firstRedenominationDate = new Date('2000-01-01');

    _secondRedenominationDate = new Date('2016-07-01');

    _getResource = async (url) => {
        const response = await fetch(`${this._apiBase}${url}`);
        if (!response.ok) {
            throw new Error(`Could not fetch ${url}, received ${response.status}`);
        }
        return await response.json();
    };

    _transformRate = (rate) => {
        return {
            currency: this._currencyNames[rate.Cur_ID],
            msDate: new Date(rate.Date),
            date: new Date(rate.Date).toLocaleDateString('ru'),
            rate: rate.Cur_OfficialRate,
        };
    };

    _getRate = async (currencyId, startDate, endDate) => {
        const dateRange = [startDate];
        if (this._firstRedenominationDate >= startDate && this._firstRedenominationDate <= endDate) {
            dateRange.push(this._firstRedenominationDate);
        }
        if (this._secondRedenominationDate >= startDate && this._secondRedenominationDate <= endDate) {
            dateRange.push(this._secondRedenominationDate);
        }
        dateRange.push(addDays(endDate, 1));

        const fetchDates = [];
        for (let i = 0; i < dateRange.length - 1; i += 1) {
            const fetchNumber = differenceInYears(dateRange[i + 1], dateRange[i]);
            for (let j = 0; j < fetchNumber; j += 1) {
                const fetchStartDate = addDays(dateRange[i], j * 365);
                const fetchEndDate = addDays(dateRange[i], (j + 1) * 365 - 1);
                fetchDates.push({
                    startDate: `${fetchStartDate.getFullYear()}-${fetchStartDate.getMonth() + 1}-${fetchStartDate.getDate()}`,
                    endDate: `${fetchEndDate.getFullYear()}-${fetchEndDate.getMonth() + 1}-${fetchEndDate.getDate()}`,
                });
            }
            const lastFetchSD = addDays(dateRange[i], fetchNumber * 365);
            const lastFetchED = addDays(dateRange[i + 1], -1);
            fetchDates.push({
                startDate: `${lastFetchSD.getFullYear()}-${lastFetchSD.getMonth() + 1}-${lastFetchSD.getDate()}`,
                endDate: `${lastFetchED.getFullYear()}-${lastFetchED.getMonth() + 1}-${lastFetchED.getDate()}`,
            });
        }

        const res = concat(...await
            Promise.all(
                fetchDates.map(
                    (promise) => this._getResource(`${currencyId}?startDate=${promise.startDate}&endDate=${promise.endDate}`)
                )
            )
        );

        return res.map(this._transformRate);
    };

    getCHF = async (startDate, endDate) => this._getRate(this._currencyIDs.CHF, startDate, endDate);

    getGBP = async (startDate, endDate) => this._getRate(this._currencyIDs.GBP, startDate, endDate);

    getUSD = async (startDate, endDate) => this._getRate(this._currencyIDs.USD, startDate, endDate);

};
