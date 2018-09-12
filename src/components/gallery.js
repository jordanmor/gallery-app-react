import React from 'react';
import GalleryItem from './galleryItem';

const Gallery = ({ images }) => {

  return (
    <div className="photo-container">
      <h2>Results</h2>
      <GalleryItem images={images} />
    </div>
   );
}
 
export default Gallery;