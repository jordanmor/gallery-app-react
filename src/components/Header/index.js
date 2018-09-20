import React from 'react';
import Nav from './Nav';
import SearchForm from './SearchForm';

const Header = props => {

  return ( 
    <header>

      <h1 className="title">My Image Gallery</h1>

      <SearchForm  
        onSearch={props.onSearch}
        setTitle={props.setTitle}
      />

      <Nav 
        tags={props.tags} 
      />

      <hr />

    </header>
   );
}
 
export default Header;