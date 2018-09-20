import React from 'react';
import GalleryItem from './GalleryItem';
import Loader from '../Loader';

const Gallery = ({ images, title, loading }) => {

  if (loading) return <Loader />;

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