import React from 'react';
//import {getResponseData} from './getResponseData';
import Axios from 'axios';
import MovieInfo from './Infos/MovieInfo';
import TVInfo from './Infos/TVInfo';
import PersonInfo from './Infos/PersonInfo';
import ErrorMessage from './../AlertMessages/ErrorMessage';
import LoadingMessage from './../AlertMessages/LoadingMessage';


//Gets the primary details for the item we want to view more info about.

/* Props:
    type: the type of the item to be viewed, as defined on TMDB 
        (currently our options are 'movie', 'tv', or 'person')
    id: the id of the item to be viewed, as defined on TMDB
    prevName: the name of the previous item
    viewInfo:
    closeInfo:
    origSearch: 
*/ 

class ViewInfo extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: null,

            loading: true,
            error: false,
        }

        
    }

    //Can put this code in constructor instead to reduce performance issues
    componentDidMount() {
        this.url = `/api/${this.props.type}/${this.props.id}`;
        this.setState({loading: true});

        Axios.get(this.url).then(
            (response) => {
                console.log("Successfully got a response for: " + this.url);
                this.setState({data: response.data, loading: false, error: false});
            }, 
            (error) => {
                console.log(error);
                this.setState({data: null, loading: false, error: true});
            }
        );
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.id !== this.props.id || prevProps.type !== this.props.type) {

            if(prevState.data != null) {
                this.setState({data: null}); //Clear out previous data, if any.
            }

            this.setState({loading: true});

            this.url = `/api/${this.props.type}/${this.props.id}`;
            Axios.get(this.url).then(
                (response) => {
                    console.log("Successfully got a response for: " + this.url);
                    this.setState({data: response.data, loading: false, error: false});
                }, 
                (error) => {
                    console.log(error);
                    this.setState({data: null, loading: false, error: true});
                }
            );
        }
    }

    render() {
        //If we did not successfully get a response, will need to display an error message.
        if(this.state.error) {
            
            console.log("Loading ViewInfo.js");
            const errorMsg = "Could not retrieve data! Please reload the page and try again.";
            return (
                <div className="view-info">
                    <ErrorMessage message={errorMsg} />
                </div>
            )

        } else if(this.state.loading) {
            
            console.log("Loading ViewInfo.js");
            const loadingMsg = "Loading...";
            return (
                <div className="view-info">
                    <LoadingMessage message={loadingMsg} />
                </div>
            )
        }
        
        var infoComponent; 
        switch(this.props.type) {
            case('movie'): 
                infoComponent = <MovieInfo movieDetails={this.state.data} 
                    viewInfo={this.props.viewInfo} closeInfo={this.props.closeInfo}/>;
                break;
            case('tv'):
                infoComponent = <TVInfo tvDetails={this.state.data}
                    viewInfo={this.props.viewInfo} closeInfo={this.props.closeInfo}/>;
                break;
            case('person'):
                infoComponent = <PersonInfo personDetails={this.state.data}
                    viewInfo={this.props.viewInfo} closeInfo={this.props.closeInfo}/>;
                break;
            default: 
                //If type does not match any of these cases, will need to display an error message.
                console.log("props.type not recognized in ViewInfo.js");
                infoComponent = null; //TODO: display an error message instead!
                break;
        }

        return (<div className="view-info">
                    <button className="back_button" onClick={() => this.props.closeInfo()}>
                        <i className="fas fa-angle-left fa-3x"></i>
                        <span>
                            Back to {this.props.prevName ? `'${this.props.prevName}'` 
                            : `results for '${this.props.origSearch}'`}
                        </span>
                    </button>
                    {infoComponent}
                </div>);
    }
     
}

export default ViewInfo;