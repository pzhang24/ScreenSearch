import React from 'react';

const InfoSummary = (props) => {
    return (
        <div className="view-info-summary">
            {props.summary.map((item, index) => {
                return (<InfoSummaryItem key={index} heading={item.heading} text={item.text}/>);
            })}
        </div>

    )
    
}

const InfoSummaryItem = (props) => {
    return (
        <div className="view-info-summary-item">
            <p><b>{props.heading}:</b> {props.text}</p>

        </div>
    );
}

export default InfoSummary;

