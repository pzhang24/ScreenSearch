import React from 'react';


const Footer = (props) => {
    return (
        <div className="footer">
            <div className="footer_container">
                <p id="creator_notice" className="footer_notice">Created by Patrick Zhang</p>
                <div id="tmdb_attribution">
                    <img src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg" 
                    alt="TMDb Logo" id="tmdb_logo"></img>
                    <p className="footer_notice" id="tmdb_notice">This product uses the TMDb API but is not endorsed or certified by TMDb.</p>
                </div>
            </div>
        </div>
    )

}

export default Footer;