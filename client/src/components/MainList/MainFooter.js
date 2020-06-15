import React from 'react';
import MainPageInfo from './MainPageInfo';

const MainFooter = (props) => {
    const {currentPage, totalPages, pageChange} = props;

    return (<div className="main-container main-footer">
        <MainPageInfo currentPage={currentPage} totalPages={totalPages} pageChange={pageChange}/>
        </div>);
}

export default MainFooter;