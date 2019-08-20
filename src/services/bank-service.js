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
        const startDate = `${sD.getFullYear()}-${sD.getMonth() + 1}-${sD.getDate()}`;
        const endDate = `${eD.getFullYear()}-${eD.getMonth() + 1}-${eD.getDate()}`;
        const res = await this._getResource(`${currId}?startDate=${startDate}&endDate=${endDate}`);
        return res.map(this._transformRate);
    };

    getCHF = async (startDate, endDate) => this._getRate(this._curIDs.CHF, startDate, endDate);

    getGBP = async (startDate, endDate) => this._getRate(this._curIDs.GBP, startDate, endDate);

    getUSD = async (startDate, endDate) => this._getRate(this._curIDs.USD, startDate, endDate);

};
