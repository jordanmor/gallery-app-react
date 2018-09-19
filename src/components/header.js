import React from 'react';
import { Link } from 'react-router-dom';
import Nav from './nav';
import SearchForm from './searchForm';

const Header = props => {

  const displaySearchLink = !props.searchDisplayed;

  const defaultSearch = () => {
    if(props.noResults) {
      props.onSearch();
    }
  }

  return ( 
    <header>
      <h1 className="title"><Link to="/" onClick={defaultSearch}>Image Gallery</Link></h1>
      {props.searchDisplayed && <SearchForm onPushHistory={props.onPushHistory} onSearch={props.onSearch}/> }
      <Nav topics={props.topics} displaySearchLink={displaySearchLink} />
    </header>
   );
}
 
export default Header;