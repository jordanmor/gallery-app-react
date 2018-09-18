import React from 'react';
import Nav from './nav';
import SearchForm from './searchForm';

const Header = props => {

  const displayLink = !props.searchDisplayed;

  return ( 
    <header>
      <h1>Image Gallery</h1>
      {props.searchDisplayed && <SearchForm onPushHistory={props.onPushHistory} onSearch={props.onSearch}/> }
      <Nav topics={props.topics} displayLink={displayLink} />
    </header>
   );
}
 
export default Header;