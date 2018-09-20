import React from 'react';
import Nav from './Nav';
import SearchForm from './SearchForm';

const Header = ({ tags, onSearch }) => {

  return ( 
    <header>
      <h1 className="title">My Image Gallery</h1>
      <SearchForm onSearch={onSearch} />
      <Nav tags={tags} />
      <hr />
    </header>
   );
}
 
export default Header;