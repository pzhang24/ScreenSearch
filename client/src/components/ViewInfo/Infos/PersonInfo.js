import React, {useState, useEffect} from 'react';
import InfoSummary from './InfoComponents/InfoSummary';
import InfoGallery from './InfoComponents/InfoGallery';
import {processObjectArray, processCreditsGallery} from './InfoHelper';
import axios from "axios";

/*Props
    personDetails: tmdb primary details for the current person
*/
const PersonInfo = (props) => {

    //TODO: Some of these fields might be null, use helper method to check whether its null or not.
    var infoSummary = createPersonSummary(props.personDetails);

    var [castGallery, setCastGallery] = useState([]);
    var [crewGallery, setCrewGallery] = useState([]);

    useEffect(() => {
        axios.get(`/api/person/${props.personDetails.id}/combined_credits`)
            .then(res => {
                console.log(res);
                //console.log(res.data.cast);
                //console.log(res.data.crew);
                //console.log(processGallery(res.data.cast, "cast"));
                setCastGallery(processCreditsGallery(res.data.cast, "person", "cast"));
                setCrewGallery(processCreditsGallery(res.data.crew, "person", "crew"));
            })
            .catch(err => {
                console.log(err);
            })
    }, [props.personDetails.id]);

    return (
        <div className="view-info">
            <h1>{props.personDetails.name}</h1>
            
            <div className="view-info-overview">
                
                <div className="view-info-container-img">
                    {props.personDetails.profile_path ? 
                        <img className="view-info-img" alt={props.personDetails.name}
                            src={`https://image.tmdb.org/t/p/w185${props.personDetails.profile_path}`}/> 
                        : <p>No Image Found</p>}
                </div>
                <InfoSummary summary={infoSummary}/>
            </div>

            {castGallery.length > 0 && <InfoGallery viewInfo={props.viewInfo} itemList={castGallery} title="Cast Roles"/>}
            {crewGallery.length > 0 && <InfoGallery viewInfo={props.viewInfo} itemList={crewGallery} title="Crew Roles"/>}

        </div>
    );
}

export default PersonInfo;

function createPersonSummary(details) {
    var summary = [];
    
    const known_for = details.known_for_department ? details.known_for_department : "N/A";
    summary.push({heading: "Known for", text: `${known_for}`});

    const birthday = details.birthday ? details.birthday : "N/A";
    summary.push({heading: "Birthday", text: `${birthday}`});

    if(details.deathday) summary.push({heading: "Deathday", text: `${details.deathday}`});

    const place_of_birth = details.place_of_birth ? details.place_of_birth : "N/A";
    summary.push({heading: "Place of Birth", text: `${place_of_birth}`}); 

    const biography = details.biography ? details.biography : "N/A";
    summary.push({heading: "Biography", text: `${biography}`}); 

    return summary;
}