import React from 'react';
import Header from './header';
import Gallery from './gallery';

const Search = ({ topics, images, onSearch, history }) => {

  const pushHistory = path =>
  history.push(path);

  return ( 
    <React.Fragment>
      <Header topics={topics} searchDisplayed={true} onPushHistory={pushHistory} onSearch={onSearch} />
      {images ? <Gallery images={images} /> : null }
    </React.Fragment>
   );
}
 
export default Search;