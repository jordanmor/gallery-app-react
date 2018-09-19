import React from 'react';
import { Link } from 'react-router-dom';
import Nav from './Nav';
import SearchForm from './SearchForm';

const Header = props => {

  const displaySearchLink = !props.searchDisplayed;

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