import React from 'react';

const GalleryItem = ({ images }) => {

  return (
    <ul>
      { images.map(image => (
        <li key={image.id}>
          <img 
            src={`https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}.jpg`}
            alt="" 
          />
        </li>
      ))}
    </ul>
   );
}
 
export default GalleryItem;