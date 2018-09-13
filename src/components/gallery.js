import React from 'react';
import GalleryItem from './galleryItem';

const Gallery = ({ images }) => {

  if (!images.length) {
    return (
      <div>
        <h3>No results found</h3>
        <p>That search did not return any results, please try again.</p>
      </div>
    );
  }

  return (
    <div className="photo-container">
      <h2>Results</h2>
      <GalleryItem images={images} />
    </div>
   );
}
 
export default Gallery;