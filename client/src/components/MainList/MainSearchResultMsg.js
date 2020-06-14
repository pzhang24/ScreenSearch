import React from 'react';

/* Props:
    searchResultMsg: Message to display to user (string)
*/
const MainSearchResultMsg = (props) => {
    return (
        <div className="search-result">
            <h1 className="main-heading" id="searchTerm">{props.searchResultMsg}</h1>
        </div>
    )
}

export default MainSearchResultMsg;