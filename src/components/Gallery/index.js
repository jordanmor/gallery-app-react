import React from 'react';
import GalleryItem from './GalleryItem';
import Loader from './Loader';

const Gallery = ({ images, title, loading }) => {

  if (loading) return <Loader />;
  
  if (images.length === 0 || !images) {
    return (
      <div className="no-gifs">
        <i className="material-icons icon-gif">sentiment_very_dissatisfied</i>
        <h3>No results found</h3>
        <p>That search did not return any results, please try again.</p>
      </div>
    );
  }

  return (
    <div className="photo-container">
      <h2>{title}</h2>
      <ul>
        {images.map(image => 
          <GalleryItem 
            key={image.id} 
            image={image} 
          /> 
        )}
      </ul>
    </div>
   );
}
 
export default Gallery;