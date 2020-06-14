
import React from 'react';

const MainPageHeader = (props) => {

    return (
        <div className="page-header">
            {(props.currentPage > 0) ? 
            <h3 className="main-heading">
                Page {props.currentPage} of {props.totalPages}
             </h3> 
             : null
            }

            {(props.currentPage > 1) ? 
                <button className="page-button" id="prevPageHead" 
                onClick={() => props.pageChange(1)}>
                    First
                </button>
                : null
            }

            {(props.currentPage > 1) ? 
                <button className="page-button" id="prevPageHead" 
                onClick={() => props.pageChange(props.currentPage - 1)}>
                    Prev
                </button>
                : null
            }


            {(props.currentPage < props.totalPages) ? 
                <button className="page-button" id="nextPageHead" 
                onClick={() => props.pageChange(props.currentPage + 1)}>
                    Next
                </button>: null}

        </div>
    )
}

export default MainPageHeader;
