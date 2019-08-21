import {differenceInYears, addDays} from 'date-fns';
import {concat} from 'lodash';

export default class BankService {

    _apiBase = 'https://www.nbrb.by/API/ExRates/Rates/Dynamics/';

    _curIDs = {
        CHF: 130,
        GBP: 143,
        USD: 145,
    };

    _curNames = {
        130: 'CHF',
        143: 'GBP',
        145: 'USD',
    };

    _firstDenominationDate = new Date('2000-01-01');

    _secondDenominationDate = new Date('2016-07-01');

    _getResource = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, received ${res.status}`)
        }
        return await res.json();
    };

    _transformRate = (rate) => {
        return {
            cur: this._curNames[rate.Cur_ID],
            rDate: new Date(rate.Date),
            date: new Date(rate.Date).toLocaleDateString('ru'),
            rate: rate.Cur_OfficialRate,
        };
    };

    _getRate = async (currId, sD, eD) => {
        const dateRange = [sD];
        if (this._firstDenominationDate >= sD && this._firstDenominationDate <= eD) {
            dateRange.push(this._firstDenominationDate);
        }
        if (this._secondDenominationDate >= sD && this._secondDenominationDate <= eD) {
            dateRange.push(this._secondDenominationDate);
        }
        dateRange.push(addDays(eD, 1));
        const fetchDates = [];
        for (let i = 0; i < dateRange.length - 1; i += 1) {
            const fetchNum = differenceInYears(dateRange[i + 1], dateRange[i]);
            for (let j = 0; j < fetchNum; j += 1) {
                const startDate = addDays(dateRange[i], j * 365);
                const endDate = addDays(dateRange[i], (j + 1) * 365 - 1);
                fetchDates.push({
                    startDate: `${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()}`,
                    endDate: `${endDate.getFullYear()}-${endDate.getMonth() + 1}-${endDate.getDate()}`
                });
            }
            const startDate = addDays(dateRange[i], fetchNum * 365);
            const endDate = addDays(dateRange[i + 1], -1);
            fetchDates.push({
                startDate: `${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()}`,
                endDate: `${endDate.getFullYear()}-${endDate.getMonth() + 1}-${endDate.getDate()}`
            });
        }

        const res = concat(...await Promise.all(
            fetchDates.map((prom) => this._getResource(`${currId}?startDate=${prom.startDate}&endDate=${prom.endDate}`))
        ));

        return res.map(this._transformRate);
    };

    getCHF = async (startDate, endDate) => this._getRate(this._curIDs.CHF, startDate, endDate);

    getGBP = async (startDate, endDate) => this._getRate(this._curIDs.GBP, startDate, endDate);

    getUSD = async (startDate, endDate) => this._getRate(this._curIDs.USD, startDate, endDate);

};
