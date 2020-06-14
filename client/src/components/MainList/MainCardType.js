import React from 'react';

const MainCardType = (props) => {

    switch(props.type) {
        case("movie"):
            return (<div className="item-type">
            <h4 className="item-type-heading">Movie</h4>
            </div>)

        case("tv"):
            return (<div className="item-type">
            <h4 className="item-type-heading">TV Show</h4>
            </div>)

        case("person"):
            return (<div className="item-type">
            <h4 className="item-type-heading">Person</h4>
            </div>)

        default:
            return (<div className="item-type">
            <h4 className="item-type-heading">Error</h4>
            </div>)
    }
}

export default MainCardType;