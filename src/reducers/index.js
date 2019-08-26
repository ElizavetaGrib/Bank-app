import {actionTypes} from '../actions';

const initialState = {
    USD: null,
    GBP: null,
    CHF: null,
    loading: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.RATES_LOADED:
            const {USD, GBP, CHF} = action.payload;
            return {
                ...state,
                USD,
                GBP,
                CHF,
                loading: false,
            };
        case actionTypes.LOADING:
            return {
                ...state,
                loading: true,
            };
        default:
            return state;
    }
};

export default reducer;
