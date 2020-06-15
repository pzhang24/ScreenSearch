import React from 'react';
import NavTop from './NavTop/NavTop';
import MainHeader from './MainList/MainHeader';
import Axios from 'axios';
import MainList from './MainList/MainList';
import ViewInfo from './ViewInfo/ViewInfo';
import Spacer from './Spacer/Spacer';
import Footer from './Footer/Footer';
import ErrorMessage from './AlertMessages/ErrorMessage';
import LoadingMessage from './AlertMessages/LoadingMessage';
import WelcomeMessage from './AlertMessages/WelcomeMessage';




/* TODO: Create MainPeopleList component -> which renders a whole bunch of MainPersonCard components
    TODO: styling for MainPeopleList component and MainPersonCard component
    */

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      //results: array of results returned by the database
      results: [],
      searchTerm: "", //Invariant: is always a string (cannot be null)
      savedSearchTerm:"", //Should be set to searchTerm whenever a search is executed

      totalResults:0,

      totalPages:0,
      currentPage:0,

      searchResultMsg: "",

      viewItemStack: [], //Invariant: stores an array of objects with the properties id and type

      welcome: true,
      loading: false,
      error: false,
      

      /*
      //api configuration details
      config_images_base_Url: "",
      config_poster_sizes: []
      */
    }

  }


  //Calls GET on the moviedb api when the search is submitted. 
  //EFFECTS: Updates state of: results, totalResults, searchResultMsg 
  handleSearchSubmit = (e) => {
    e.preventDefault();

    if (this.state.searchTerm === "") {
      return;
    }

    const customUrl = `/api/search/multi?query=${this.state.searchTerm}`;
    this.setState({loading: true, welcome: false});

    Axios.get(customUrl).then(
      response => {
        console.log(response.data);
        console.log(response.data.results);
        console.log(typeof(response.data.results));

        //Get the results for the search term... API only returns first 20 results initially
        this.setState({results: [...response.data.results]});  

        this.setState({totalResults: response.data.total_results});//get the total number of results
        this.setState({totalPages: response.data.total_pages});//get the total number of pages

        this.setState((prevState) => {return {searchResultMsg: "Found " + response.data.total_results + 
        ` result${(response.data.total_results === 1) ? "":"s"} for '` + prevState.searchTerm + "'"}});

        this.setState({currentPage: 1});
        this.setState((prevState) => {return {savedSearchTerm: prevState.searchTerm}});
        this.setState({viewItemStack: [], searchTerm: ""}); //Clear the viewItemStack and the searchTerm

        this.setState({loading: false, error: false});

      }, error => {
        console.log(error);
        this.setState({viewItemStack: [], searchTerm: ""}); //Clear the viewItemStack and the searchTerm
        this.setState({loading: false, error: true});
      }
    );
  }

  //Called when the input changes in the searchbar
  handleSearchTermChange = (e) => {
    this.setState({searchTerm: e.target.value});
  }

  //Handles page changes
  pageChange = (pageNumber) => {

    const url = `/api/search/multi?query=${this.state.savedSearchTerm}&page=${pageNumber}`;

    this.setState({loading: true});
    Axios.get(url).then(
      response => {
        this.setState({ results: [...response.data.results] , currentPage: pageNumber});
        this.setState({loading: false, error: false});
      }, error => {
        console.log(error);
        this.setState({loading: false, error: true});
      }
    );
  }

  //Displays more information about an item (movie, show, person) when user requests to view more info
  viewInfo = (newID, newType) => {
    console.log("Viewing Info!")
    this.setState((state) => (
      {viewItemStack: [...state.viewItemStack, {id: newID, type: newType}]}));
  }

  //Closes components displaying more information about the current item (movie, show, person) 
  closeInfo = () => {
    this.setState((state) => (
      {viewItemStack: [...state.viewItemStack.slice(0, state.viewItemStack.length - 1)]}
    ));
  }

  render() {

    const currentItem = this.state.viewItemStack[this.state.viewItemStack.length - 1];
    const currentItemType = currentItem ? currentItem.type : undefined;
    const currentItemId = currentItem ? currentItem.id : undefined;
    console.log("Current Item Type is: " + currentItemType);
    console.log("Current Item Id is: " + currentItemId);


    let content;
    if (this.state.welcome) {
        const welcomeMessage = "Find information on your favourite movies, TV shows, actors and actresses, directors, producers, and more!";
        content = (<div className="main">
          <WelcomeMessage message={welcomeMessage}/>
          </div>
        );
    } else if (this.state.error) {
        const errorMessage = "Something went wrong! Please refresh the page and try again.";
        content = (<div className="main">
          <ErrorMessage message={errorMessage}/>
          </div>
        );
    } else if (this.state.loading) {
        const loadingMessage = "Searching...";
        content = (<div className="main">
          <LoadingMessage message={loadingMessage}/>
          </div>
        );
    } else if (currentItemType && currentItemId) {
        content = (<div className="main">
          <ViewInfo type={currentItemType} id={currentItemId} viewInfo={this.viewInfo} closeInfo={this.closeInfo}/>
          </div>
        );
    } else {
        content = (
          <div className="main">
            <MainHeader searchResultMsg = {this.state.searchResultMsg} currentPage = {this.state.currentPage} 
            totalPages = {this.state.totalPages} pageChange={this.pageChange}/>
            <MainList results={this.state.results} viewInfo={this.viewInfo}/>
          </div>
        );
    }

    return (
      <div id="App">
        <NavTop handleSearchSubmit={this.handleSearchSubmit} handleChange={this.handleSearchTermChange} 
          searchValue={this.state.searchTerm} disableSearch={this.state.loading}/>
        {content}
        <Spacer/>
        <Footer/>
      </div>
    )
  }
  
}


export default App;
