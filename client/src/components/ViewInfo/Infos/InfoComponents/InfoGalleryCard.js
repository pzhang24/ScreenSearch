import React from 'react';

/*
Props: 
    viewInfo: function to viewInfo when gallery item is clicked
    cardInfo: info for the card (id, type, img_path, maintext, subtext)
*/
const InfoGalleryCard = (props) => {
    return (
        <div className="gallery_card">
            <InfoGalleryCardImage viewInfo={props.viewInfo} cardInfo={props.cardInfo}/>
            <InfoGalleryCardText viewInfo={props.viewInfo} cardInfo={props.cardInfo}/>
        </div>
    )
}

const InfoGalleryCardImage = (props) => {
    return (
            <div className="gallery_card_image_container" 
                onClick={() => {props.viewInfo(props.cardInfo.id, props.cardInfo.type);}}>
                    {props.cardInfo.img_path ? 
                        <img src={`https://image.tmdb.org/t/p/w185${props.cardInfo.img_path}`} alt={props.cardInfo.maintext}/>
                        : <p>No Image Found</p>}
            </div>
    )
}

const InfoGalleryCardText = (props) => {
    return (
        <div className="gallery_card_text">
            <p className="gallery_card_maintext">
                <span onClick={() => {props.viewInfo(props.cardInfo.id, props.cardInfo.type);}}>
                    {props.cardInfo.maintext ? props.cardInfo.maintext : "Unknown"}
                </span>
            </p>
            <p className="gallery_card_subtext">
                {props.cardInfo.subtext ? props.cardInfo.subtext : "N/A"}
            </p>
        </div>
    )
}

export default InfoGalleryCard;