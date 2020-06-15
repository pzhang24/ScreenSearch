import React, {useState, useEffect} from 'react';
import InfoSummary from './InfoComponents/InfoSummary';
import InfoGallery from './InfoComponents/InfoGallery';
import {processObjectArray, processCreditsGallery} from './InfoHelper';
import axios from "axios";

/*Props
    tvDetails: tmdb primary details for this tv series
*/
const TVInfo = (props) => {

    //TODO: Some of these fields might be null, use helper method to check whether its null or not.
    var infoSummary = createTVSummary(props.tvDetails);

    var [castGallery, setCastGallery] = useState([]);
    var [crewGallery, setCrewGallery] = useState([]);

    useEffect(() => {
        let mounted = true;
        axios.get(`/api/tv/${props.tvDetails.id}/credits`)
            .then(res => {
                if (mounted) {
                    console.log(res);
                    setCastGallery(processCreditsGallery(res.data.cast, "tv", "cast"));
                    setCrewGallery(processCreditsGallery(res.data.crew, "tv", "crew"));
                }
            })
            .catch(err => {
                console.log(err);
            });

        return () => mounted = false;
    }, [props.tvDetails.id]);
    
    return (
        <div>
            <h1>{props.tvDetails.name}</h1>

            <div className="view-info-overview">
                
                <div className="view-info-container-img">
                    {props.tvDetails.poster_path ? 
                        <img className="view-info-img" alt={props.tvDetails.name}
                            src={`https://image.tmdb.org/t/p/w185${props.tvDetails.poster_path}`}/> 
                        : <p>No Image Found</p>}
                </div>
                
                <InfoSummary summary={infoSummary}/>
            </div>

            {castGallery.length > 0 && <InfoGallery viewInfo={props.viewInfo} itemList={castGallery} title="Primary Cast"/>}
            {crewGallery.length > 0 && <InfoGallery viewInfo={props.viewInfo} itemList={crewGallery} title="Crew"/>}
        </div>
    );
}

export default TVInfo;

function createTVSummary(details) {
    var summary = [];

    const status = details.status ? details.status : "N/A";
    summary.push({heading: "Status", text: `${status}`});
    
    const first_air_date = details.first_air_date ? details.first_air_date : "N/A";
    summary.push({heading: "First Air Date", text: `${first_air_date}`});

    const last_air_date = details.last_air_date ? details.last_air_date : "N/A";
    summary.push({heading: "Last Air Date", text: `${last_air_date}`});

    const number_of_seasons = details.number_of_seasons ? details.number_of_seasons : "N/A";
    summary.push({heading: "Number of Seasons", text: `${number_of_seasons}`});

    const number_of_episodes = details.number_of_episodes ? details.number_of_episodes : "N/A";
    summary.push({heading: "Number of Episodes", text: `${number_of_episodes}`});

    const createdBy = details.created_by ? processObjectArray(details.created_by, "name") : "N/A";
    summary.push({heading: "Created By", text: `${createdBy}`});

    const genres = details.genres ? processObjectArray(details.genres, "name") : "N/A";
    summary.push({heading: "Genres", text: `${genres}`});

    const overview = details.overview ? details.overview : "N/A";
    summary.push({heading: "Overview", text: `${overview}`}); 

    return summary;
}

