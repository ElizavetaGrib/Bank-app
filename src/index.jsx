import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';

import store from './store';
import BankService from './services/bank-service';
import ErrorBoundary from './components/error-boundary';
import {BankServiceProvider} from './components/bank-service-context';
import App from './components/app';

const bankService = new BankService();

render(
    <Provider store={store}>
        <ErrorBoundary>
            <BankServiceProvider value={bankService}>
                <App/>
            </BankServiceProvider>
        </ErrorBoundary>
    </Provider>,
    document.getElementById('root')
);
