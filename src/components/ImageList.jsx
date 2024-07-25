import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types"
import { GetPhotosAsync } from '../utils/services';

const propTypes = {
    images: PropTypes.array,
    setImages: PropTypes.func.isRequired
}

const ImageList = ({ images, setImages }) => {
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const pageSize = 12;

    useEffect(() => {
        if (!loading) {
            setLoading(true)
            GetPhotosAsync(page, pageSize).then(response => response.json()).then(data => {
                data.length > 0 && setPhotos(prevPhotos => [...prevPhotos, ...data])
                setHasMore(data.length > 0);
            })
            setLoading(false)
        }
    }, [page]);

    const handleScroll = () => {
        if (!loading && hasMore &&
            window.innerHeight + document.documentElement.scrollTop >=
            document.documentElement.scrollHeight - 20) {
            setPage(prevPage => prevPage + 1);
        }
    }

    const onScrolldiv = (e) => {
        if (e.target.scrollTop > (e.target.clientHeight * page)) {
            setPage(prevPage => prevPage + 1);
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loading, hasMore]);

    const addPhoto = (id) => {
        setImages(prevImages => [...prevImages, photos.find(f => f.id === id)])
    }

    const removePhoto = (id) => {
        setImages(prevImages => prevImages.filter(f => f.id !== id))
    }


    return (
        <div className={images.length > 0 ? 'height-50' : ''} onScroll={(e) => onScrolldiv(e)}>
            <div className="container">
                <div className="row">
                    {photos.map(photo => {
                        return (<div key={photo.id} className="col-md-2 d-flex align-items-start flex-column">
                            <img src={photo.url} alt={photo.title} className="img-thumbnail" />
                            <label className="label">Title: {photo.title}</label>
                            <label className="label">Id: {photo.id}</label>
                            <span title={photo.url} className="word-wrap">Url: {photo.url}</span>
                            <div className="mt-auto container">
                                <div className="row">
                                    {images && images.find(f => f.id === photo.id) ?
                                        <button type="button" className="btn btn-danger btn-sm btn-block" onClick={() => { removePhoto(photo.id) }}>Remove</button> :
                                        <button type="button" className="btn btn-primary btn-sm btn-block" onClick={() => { addPhoto(photo.id) }} >Compare</button>}
                                </div>
                            </div>
                            <br />
                        </div>)
                    })}
                </div>
                {loading && <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                    </div>
                </div>}

            </div>
        </div>
    )
}

ImageList.propTypes = propTypes
export default ImageList;
