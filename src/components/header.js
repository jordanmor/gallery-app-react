import React from 'react';
import { Link } from 'react-router-dom';
import Nav from './nav';
import SearchForm from './searchForm';

const Header = props => {

  const displaySearchLink = !props.searchDisplayed;

  return ( 
    <header>
      <h1 className="title"><Link to="/">Image Gallery</Link></h1>
      {props.searchDisplayed && <SearchForm onPushHistory={props.onPushHistory} onSearch={props.onSearch}/> }
      <Nav topics={props.topics} displaySearchLink={displaySearchLink} />
    </header>
   );
}
 
export default Header;