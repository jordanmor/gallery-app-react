import React from 'react';
import Header from './Header';
import Gallery from './Gallery';

const Search = props => {

  const { topics, images, onSearch, history, match, loading } = props;
  const title = match.params.query;
  // This variable holds a boolean. True when search has no results.
  const noResults = !images || images.length === 0;

  /* The search component has the history prop from Route. This is where 
  a new path can be pushed into the history object, resulting in a route that
  matches a succesfull search result */
  const pushHistory = path => history.push(path);

  return ( 
    <React.Fragment>
      <Header 
        topics={topics} 
        searchDisplayed={true} 
        onPushHistory={pushHistory} 
        onSearch={onSearch} 
        noResults={noResults}
      />

      {
        images // display Gallery component only if search has returned images
          ? <Gallery 
              images={images} 
              title={title} 
              loading={loading} 
            /> 
          : null // otherwise return null
      }
    </React.Fragment>
  );
}
 
export default Search;