
import React from 'react';

const MainPageHeader = (props) => {

    return (
        <div className="page-header">
            {(props.totalPages > 0) ? 
            <h3 className="main-heading">
                Page {props.currentPage} of {props.totalPages}
             </h3> 
             : null
            }

            <div className="page-button-row">
                {(props.currentPage > 1) ? 
                    <button className="page-button backward-button" id="firstPageHead" 
                    onClick={() => props.pageChange(1)}>
                        <i className="fas fa-angle-left"></i>
                        <i className="fas fa-angle-left"></i>
                        <span>First</span>
                    </button>
                    : null
                }

                {(props.currentPage > 1) ? 
                    <button className="page-button backward-button" id="prevPageHead" 
                    onClick={() => props.pageChange(props.currentPage - 1)}>
                        <i className="fas fa-angle-left"></i>
                        <span>Prev</span>
                    </button>
                    : null
                }


                {(props.currentPage < props.totalPages) ? 
                    <button className="page-button forward-button" id="nextPageHead" 
                        onClick={() => props.pageChange(props.currentPage + 1)}>
                        <span>Next</span>
                        <i className="fas fa-angle-right"></i>
                    </button>: null}

                {(props.currentPage < props.totalPages) ? 
                    <button className="page-button forward-button" id="lastPageHead" 
                        onClick={() => props.pageChange(props.totalPages)}>
                        <span>Last</span>
                        <i className="fas fa-angle-right"></i>
                        <i className="fas fa-angle-right"></i>
                </button>: null}
            </div>
        </div>
    )
}

export default MainPageHeader;
