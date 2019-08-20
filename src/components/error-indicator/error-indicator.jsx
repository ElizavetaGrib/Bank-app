import React from 'react';

import './error-indicator.css';

const ErrorIndicator = ({error, info}) => {
    return (
        <>
            <h2 className='error-header'>Something went wrong!</h2>
            <details>
                <summary>{error}</summary>
                {info}
            </details>
        </>
    );
};

export default ErrorIndicator;
