const rateLoaded = (rates) => {
    return {
        type: 'RATE_LOADED',
        payload: rates,
    };
};

const loading = () => {
    return {
        type: 'LOADING',
    }
};

export {
    rateLoaded,
    loading,
};
