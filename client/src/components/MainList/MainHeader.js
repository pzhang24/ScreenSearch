import React from 'react';
import MainSearchResultMsg from './MainSearchResultMsg';
import MainPageHeader from './MainPageHeader';

class MainHeader extends React.Component {

    render() {
    return (
        
        <div className="main-container header">

            <MainSearchResultMsg searchResultMsg={this.props.searchResultMsg}/>
            <MainPageHeader currentPage={this.props.currentPage} totalPages={this.props.totalPages} 
            pageChange={this.props.pageChange}/>

        </div>
    );
    }
}

export default MainHeader;