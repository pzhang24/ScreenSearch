import React from 'react';

const ErrorMessage = (props) => {
    const {message} = props;

    return (<div className="error_message_container">
                <h1 className="error_message">{message}</h1>
            </div>)
}

export default ErrorMessage;