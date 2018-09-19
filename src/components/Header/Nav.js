import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = ({ topics, displaySearchLink }) => {
  // Nav links are created using the topics defined in the App.js state
  return ( 
    <nav className="main-nav">
      <ul>
        {topics.map(topic => {
          const btnText = topic.tag.substring(0, 1).toUpperCase() + topic.tag.substring(1);
          return (
            <li key={topic.tag}>
              <NavLink to={`/topics/${topic.tag}`}>{btnText}</NavLink>
            </li>
            );
          })
        }
        {
          // Search link only appears when the search bar is not displayed
          displaySearchLink && <li><NavLink to='/search'>Search</NavLink></li>
        }
      </ul>
    </nav>
   );
}
 
export default Nav;