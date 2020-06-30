import React, {useState, useEffect} from 'react';
import InfoSummary from './InfoComponents/InfoSummary';
import InfoGallery from './InfoComponents/InfoGallery';
import {processObjectArray, processCreditsGallery, processRecommendedGallery} from './InfoHelper';
import axios from "axios";

/*Props:
    movieDetails: tmdb primary details for this movie
*/
const MovieInfo = (props) => {

    //TODO: Some of these fields might be null, use helper method to check whether its null or not.
    console.log(props.movieDetails);
    var infoSummary = createMovieSummary(props.movieDetails);

    var [castGallery, setCastGallery] = useState([]);
    var [crewGallery, setCrewGallery] = useState([]);
    var [recommendedGallery, setRecommendedGallery] = useState([]);
    var [similarGallery, setSimilarGallery] = useState([]);
    
    useEffect(() => {
        let mounted = true;

        axios.get(`/api/movie/${props.movieDetails.id}/credits`)
            .then(res => {
                if (mounted) {
                    setCastGallery(processCreditsGallery(res.data.cast, "movie", "cast", "person"));
                    setCrewGallery(processCreditsGallery(res.data.crew, "movie", "crew", "person"));
                }
            })
            .catch(err => {
                console.log(err);
            });

        axios.get(`/api/movie/${props.movieDetails.id}/recommendations`)
            .then(res => {
                if (mounted) {
                    setRecommendedGallery(processRecommendedGallery(res.data.results, "movie"));
                }
            })
            .catch(err => {
                console.log(err);
            });

        axios.get(`/api/movie/${props.movieDetails.id}/similar`)
            .then(res => {
                if (mounted) {
                    console.log(res);
                    setSimilarGallery(processRecommendedGallery(res.data.results, "movie"));
                }
            })
            .catch(err => {
                console.log(err);
            });
        
        return () => mounted = false;
    }, [props.movieDetails.id]);

    return (
        <div>
            <h1>{props.movieDetails.title}</h1>
            
            <div className="view-info-overview">
                
                <div className="view-info-container-img">
                    {props.movieDetails.poster_path ? 
                        <img className="view-info-img" alt={props.movieDetails.title}
                            src={`https://image.tmdb.org/t/p/w185${props.movieDetails.poster_path}`}/> 
                        : <p>No Image Found</p>}
                </div>
                <InfoSummary summary={infoSummary}/>
                
            </div>
            
            
            {castGallery.length > 0 && <InfoGallery viewInfo={props.viewInfo} itemList={castGallery} title="Cast"/>}
            {crewGallery.length > 0 && <InfoGallery viewInfo={props.viewInfo} itemList={crewGallery} title="Crew"/>}
            
            {similarGallery.length > 0 && <InfoGallery viewInfo={props.viewInfo} itemList={similarGallery} title="Similar Movies"/>}
            {recommendedGallery.length > 0 && <InfoGallery viewInfo={props.viewInfo} itemList={recommendedGallery} title="Recommended Movies"/>}

        </div>
    );
}

export default MovieInfo;

//Returns a list of objects, each with a heading and a text field.
function createMovieSummary(details) {
    var summary = [];

    const status = details.status ? details.status : "N/A";
    summary.push({heading: "Status", text: `${status}`});
    
    const release_date = details.release_date ? details.release_date : "N/A";
    summary.push({heading: "Release Date", text: `${release_date}`});

    const runtime = details.runtime ? details.runtime : "N/A";
    summary.push({heading: "Runtime (min)", text: `${runtime}`});

    const genres = details.genres ? processObjectArray(details.genres, "name") : "N/A";
    summary.push({heading: "Genres", text: `${genres}`});

    const overview = details.overview ? details.overview : "N/A";
    summary.push({heading: "Overview", text: `${overview}`}); 

    return summary;
}