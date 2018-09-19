import React from 'react';
import { Link } from 'react-router-dom';
import Nav from './Nav';
import SearchForm from './SearchForm';

const Header = props => {

  // Search link only appears when the search bar is not displayed
  const displaySearchLink = !props.searchDisplayed;

  /* If there are no results from search, clicking on the 
  header title will go to home page and start a new search
  using the default tag. If the search does yield results, clicking
  on the header title will go to the home page and keep the current 
  search images and title */
  const defaultSearch = () => {
    if(props.noResults) {
      props.onSearch();
    }
  }

  return ( 
    <header>

      <h1 className="title">
        <Link to="/" onClick={defaultSearch}>My Image Gallery</Link>
      </h1>

      {
        // Search Bar only displayed when route is /search or /search/:query
        props.searchDisplayed && 
        <SearchForm 
          onPushHistory={props.onPushHistory} 
          onSearch={props.onSearch}
        /> 
      }

      <Nav 
        topics={props.topics} 
        displaySearchLink={displaySearchLink} 
      />

      <hr />

    </header>
   );
}
 
export default Header;