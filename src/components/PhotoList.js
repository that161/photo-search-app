// src/components/PhotoList.js
import React from 'react';

const PhotoList = ({ photos }) => {
    return (
        <div className="photo-list">
            {photos.map((photo) => (
                <img key={photo.id} src={photo.urls.full} alt={photo.alt_description} width={200} height={200} />
            ))}
        </div>
    );
};

export default PhotoList;
