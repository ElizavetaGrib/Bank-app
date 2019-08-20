import React from 'react';

import {BankServiceConsumer} from '../bank-service-context';

const withBankService = () => (Wrapped) => {
    return (props) => {
        return (
            <BankServiceConsumer>
                {
                    (bankService) => {
                        return (
                            <Wrapped {...props}
                                     bankService={bankService}/>
                        );
                    }
                }
            </BankServiceConsumer>
        );
    };
};

export default withBankService;
