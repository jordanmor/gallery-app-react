import React from 'react';
import { Route } from 'react-router-dom';
import Gallery from './Gallery';
import Loader from './Loader';
import NoResults from './NoResults';

const Search = ({ images, loading, match }) => {
  
  if (loading) return <Loader />;
  
  if (!images.length) return <Route component={NoResults} />

  return ( 
    <Gallery 
      images={images} 
      title={match.params.query}
    />
 );
}
 
export default Search;