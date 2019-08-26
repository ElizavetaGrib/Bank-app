const actionTypes = {
    RATES_LOADED: 'RATES_LOADED',
    LOADING: 'LOADING',
};

const ratesLoaded = (rates) => {
    return {
        type: actionTypes.RATES_LOADED,
        payload: rates,
    };
};

const loading = () => {
    return {
        type: actionTypes.LOADING,
    }
};

export {
    actionTypes,
    ratesLoaded,
    loading,
};
