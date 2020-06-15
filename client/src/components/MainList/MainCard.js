import React from 'react';
import MainCardType from './MainCardType';

/* Props: 
    img: Path to desired poster/profile image (string or null)
    type: Either movie, show, or person
    id: ID of movie, show, or person
    name: Name of movie, show, or person (string) {Aside: TMDB defines movie and tv show names as "titles"}
    viewInfo: function to call to view more info on an item
*/

const MainCard = (props) => {
    return (
        <div className="item-card" >
            <div className="item-img-container" onClick={() => props.viewInfo(props.id, props.type, props.name)}>
                {
                    //Check if a profile image for this person exists
                    props.img == null ? <p className="item-not-found"><span>No Image Found</span></p>
                    : <img className="item-img" src={`https://image.tmdb.org/t/p/w185${props.img}`} 
                    alt={props.name}/>
                }
            </div>
            <div className="item-text">
                <div className="item-name">
                    <h3 className="item-name-heading" onClick={() => props.viewInfo(props.id, props.type, props.name)}>
                        <span>{props.name}</span>
                    </h3>
                </div>

                <MainCardType type={props.type}/>
                
                {/*
                <div className="item-cta">
                    <button onClick={() => props.viewInfo(props.id, props.type)} className="item-cta-button">More Info</button>
                </div>
                */}
            </div>
        </div>
    )
}

export default MainCard;