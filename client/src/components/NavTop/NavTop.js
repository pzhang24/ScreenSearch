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
            <form action="" onSubmit={props.handleSearchSubmit}>
                <input placeholder="Search movies, shows, people..." 
                    type="text" onChange={props.handleChange} value={props.searchValue}
                    disabled={props.disableSearch}></input>
                <button type="submit" className="nav-search-submit" disabled={props.disableSearch}>
                    <i className="fa fa-search"></i>
                </button>
            </form>
        </div>
    );
}

export default NavTop;