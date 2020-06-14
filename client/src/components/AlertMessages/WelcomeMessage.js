import React from 'react';

const WelcomeMessage = (props) => {
    const {message} = props;

    return (<div className="welcome_message_container">
                <h1 className="welcome_message">{message}</h1>
            </div>)
}

export default WelcomeMessage;