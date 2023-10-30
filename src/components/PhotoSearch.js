// src/components/PhotoSearch.js
import React, { useState, useEffect } from 'react';
import PhotoList from './PhotoList';
import LoadingIndicator from './LoadingIndicator';

const PhotoSearch = () => {
    const [searchText, setSearchText] = useState('');
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);

    const fetchPhotos = async () => {
        setLoading(true);

        const response = await fetch(
            `https://api.unsplash.com/search/photos?query=${searchText}&page=${page}`,
            {
                headers: {
                    Authorization: 'Client-ID uRdvupb_hdh43t_L_SdsRzQ5rZ6Grf2R5jjSrYjkiCo',
                },
            }
        );

        if (response.ok) {
            const data = await response.json();
            setPhotos((prevPhotos) => [...prevPhotos, ...data.results]);
            setPage(page + 1);
        }

        setLoading(false);
    };

    useEffect(() => {
        if (searchText && !loading) {
            fetchPhotos();
        }
    }, [page]);

    const handleSearch = () => {
        setPhotos([]);
        setPage(1);
        fetchPhotos();
    };

    return (
        <div>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search for photos..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
            </div>

            <PhotoList photos={photos} />
            {loading && <LoadingIndicator />}
        </div>
    );
};

export default PhotoSearch;
