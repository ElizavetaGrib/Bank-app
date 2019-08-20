import {createContext} from 'react';

const {
    Provider: BankServiceProvider,
    Consumer: BankServiceConsumer
} = createContext();

export {
    BankServiceProvider,
    BankServiceConsumer,
};
