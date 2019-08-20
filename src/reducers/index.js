const initialState = {
    USD: null,
    GBP: null,
    CHF: null,
    loading: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOADING':
            return {
                ...state,
                loading: true,
            };
        case 'RATE_LOADED':
            const {USD, GBP, CHF} = action.payload;
            return {
                ...state,
                USD,
                GBP,
                CHF,
                loading: false,
            };
        default:
            return state;
    }
};

export default reducer;
