import React from 'react';
import Nav from './nav';
import SearchForm from './searchForm';

const Header = props => {
  return ( 
    <header>
      <h1>Image Gallery</h1>
      {props.search && <SearchForm onPushHistory={props.onPushHistory} onSearch={props.onSearch}/> }
      <Nav topics={props.topics} />
    </header>
   );
}
 
export default Header;