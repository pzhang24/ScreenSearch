import React from 'react';

const LoadingMessage = (props) => {
    const {message} = props;

    return (<div className="loading_message_container">
                <h1 className="loading_message">{message}</h1>
            </div>)
}

export default LoadingMessage;