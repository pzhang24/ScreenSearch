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

    var [movieCastGallery, setMovieCastGallery] = useState([]);
    var [movieCrewGallery, setMovieCrewGallery] = useState([]);
    var [tvCastGallery, setTvCastGallery] = useState([]);
    var [tvCrewGallery, setTvCrewGallery] = useState([]);

    useEffect(() => {
        let mounted = true;
        axios.get(`/api/person/${props.personDetails.id}/movie_credits`)
            .then(res => {
                if (mounted) {
                    console.log(res);
                    setMovieCastGallery(processCreditsGallery(res.data.cast, "person", "cast"));
                    setMovieCrewGallery(processCreditsGallery(res.data.crew, "person", "crew"));
                }
            })
            .catch(err => {
                console.log(err);
        });

        axios.get(`/api/person/${props.personDetails.id}/tv_credits`)
            .then(res => {
                if (mounted) {
                    console.log(res);
                    setTvCastGallery(processCreditsGallery(res.data.cast, "person", "cast"));
                    setTvCrewGallery(processCreditsGallery(res.data.crew, "person", "crew"));
                }
            })
            .catch(err => {
                console.log(err);
        });
        
        return () => mounted = false;
        
    }, [props.personDetails.id]);

    return (
        <div>
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

            {movieCastGallery.length > 0 && <InfoGallery viewInfo={props.viewInfo} itemList={movieCastGallery} title="Movie Cast Roles"/>}
            {tvCastGallery.length > 0 && <InfoGallery viewInfo={props.viewInfo} itemList={tvCastGallery} title="TV Cast Roles"/>}
            {movieCrewGallery.length > 0 && <InfoGallery viewInfo={props.viewInfo} itemList={movieCrewGallery} title="Movie Crew Roles"/>}
            {tvCrewGallery.length > 0 && <InfoGallery viewInfo={props.viewInfo} itemList={tvCrewGallery} title="TV Crew Roles"/>}

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