import React from 'react';
import { Route } from 'react-router-dom';
import Header from './Header';
import Gallery from './Gallery';
import NotFound from './NotFound';

const Search = props => {

  const { topics, images, onSearch, history, match, loading, getSearchText, searchText } = props;

  const title = match.params.query;

  /* If the title, which is taken from the parameter after the search route, does not 
  match the search text taken from the search field input, that means the title comes 
  from a URL path that does not match an existing route. The title should only be originally 
  derived from the search text from the search field input, which is pushed into the 
  history object when a successful search has been made. */

  if(title !== searchText) return <Route render={ () => <NotFound topics={topics}/> } />
  
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
        getSearchText={getSearchText}
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