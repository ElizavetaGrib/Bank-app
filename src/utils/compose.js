const compose = (...functions) => (comp) => {
    return functions.reduceRight(
        (wrapped, f) => f(wrapped), comp);
};

export default compose;
