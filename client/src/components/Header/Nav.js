import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = ({ tags }) => {
  // Nav links are created using the topics defined in the main component App's state
  return ( 
    <nav className="main-nav">
      <ul>
        {tags.map(tag => {
          return (
            <li key={tag}>
              <NavLink className='tag' to={`/topics/${tag}`}>{tag}</NavLink>
            </li>
            );
          })
        }
      </ul>
    </nav>
   );
}
 
export default Nav;