import React from 'react';

/* Props
    handleSearchSubmit: function to handle when the user submits a search
    handleChange: function to handle changes in the search input box
    searchValue: current value of the searchTerm
*/ 
const NavTop = (props) => {
    return (
        <div className="nav-top">
            <a className="nav-title" href="#">SCREEN SEARCH</a>
            <div className="nav-search">
                <form action="" onSubmit={props.handleSearchSubmit}>
                    <input className="nav-input" placeholder="Search..." 
                        type="text" onChange={props.handleChange} value={props.searchValue}
                        disabled={props.disableSearch}></input>
                    <button type="submit" className="nav-submit" disabled={props.disableSearch}>
                        <i className="fa fa-search"></i>
                    </button>
                </form>
            </div>
        </div>
    );
}

export default NavTop;