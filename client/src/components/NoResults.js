import React from 'react';

const NoResults = () => {
  return ( 
    <div className="no-gifs">
      <i className="material-icons icon-gif">sentiment_very_dissatisfied</i>
      <h3>No results found</h3>
      <p>That search did not return any results, please try again.</p>
    </div>
   );
}
 
export default NoResults;