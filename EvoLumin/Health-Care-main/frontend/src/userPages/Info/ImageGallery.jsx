import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ImageGallery() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Fetch image metadata from backend
    axios.get('http://localhost:3000/user/images')
      .then((response) => {
        setImages(response.data);
      })
      .catch((error) => {
        console.error("Error fetching images:", error);
      });
  }, []);

  return (
    <div className="image-gallery">
      {images.map((image, index) => (
        <div key={index}>
          <img
            src={`http://localhost:3000/user/images/${image.filename}`} // Fetch each image using the filename
            alt={`Image ${index + 1}`}
            style={{ width: '100%', height: 'auto' }}
          />
        </div>
      ))}
    </div>
  );
}

export default ImageGallery;
