import React, {Component} from 'react';

import ErrorIndicator from '../error-indicator';

export default class ErrorBoundary extends Component {

    state = {
        hasError: false,
        error: null,
        info: null,
    };

    componentDidCatch(error, info) {
        this.setState({
            hasError: true,
            error,
            info,
        });
    };

    render() {
        const {hasError, error, info} = this.state;
        if (hasError) {
            return (
                <ErrorIndicator error={error}
                                info={info}/>
            );
        }
        return this.props.children;
    };
};
