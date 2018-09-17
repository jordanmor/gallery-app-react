import React from 'react';
import Nav from './nav';
import SearchForm from './searchForm';

const Header = props => {
  return ( 
    <header>
      <h1>Image Gallery</h1>
      <SearchForm onSearch={props.onSearch} />
      <Nav />
    </header>
   );
}
 
export default Header;