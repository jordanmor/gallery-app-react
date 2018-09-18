import React from 'react';
import Header from './header';
import Gallery from './gallery';

const Search = ({ topics, images, onSearch, history, match }) => {

  const pushHistory = path =>
  history.push(path);

  const title = match.params.query;

  return ( 
    <React.Fragment>
      <Header topics={topics} searchDisplayed={true} onPushHistory={pushHistory} onSearch={onSearch} />
      {images ? <Gallery images={images} title={title} /> : null }
    </React.Fragment>
   );
}
 
export default Search;