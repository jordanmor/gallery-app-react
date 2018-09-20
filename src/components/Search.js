import React from 'react';
import { Route } from 'react-router-dom';
import Gallery from './Gallery';
import Loader from './Loader';
import NoResults from './NoResults';

const Search = props => {

  const { images, loading } = props;

  const title = props.match.params.query;
  
  if (loading) return <Loader />;
  
  if (!images.length) return <Route component={NoResults} />

  return ( 
    <Gallery 
      images={images} 
      title={title}
    />
 );
}
 
export default Search;