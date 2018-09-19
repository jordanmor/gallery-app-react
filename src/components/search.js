import React from 'react';
import Header from './header';
import Gallery from './gallery';

const Search = props => {

  const { topics, images, onSearch, history, match, loading } = props;
  const title = match.params.query;
  const noResults = !images || images.length === 0;

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
        images 
          ? <Gallery 
              images={images} 
              title={title} 
              loading={loading} 
            /> 
          : null 
      }
    </React.Fragment>
  );
}
 
export default Search;