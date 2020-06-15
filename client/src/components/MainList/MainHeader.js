import React from 'react';
import MainSearchResultMsg from './MainSearchResultMsg';
import MainPageInfo from './MainPageInfo';

class MainHeader extends React.Component {

    render() {
    return (
        
        <div className="main-container main-header">

            <MainSearchResultMsg searchResultMsg={this.props.searchResultMsg}/>
            <MainPageInfo currentPage={this.props.currentPage} totalPages={this.props.totalPages} 
            pageChange={this.props.pageChange}/>

        </div>
    );
    }
}

export default MainHeader;