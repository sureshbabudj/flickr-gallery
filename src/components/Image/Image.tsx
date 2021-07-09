import Loading from '../Loading/Loading';
import React, {MutableRefObject, ReactElement, useContext} from 'react';
import {Photo, ContextType} from '../../types';
import './Image.scss';
import {Context} from '../../Store';

export interface ImageProps {
    ref?: MutableRefObject<HTMLElement>;
    photo: Photo;
    type: 'contain' | 'cover';
}

function Image({photo, type}: ImageProps): ReactElement {
    const {state, dispatch} = useContext<ContextType>(Context);
    const favorites = state.favoriteReducer;
    const photoId = `${photo.server}/${photo.id}_${photo.secret}`;
    const isFavorite =
        favorites && favorites.length && favorites.includes(photoId);
    const url = `https://live.staticflickr.com/${photoId}_w.jpg`;
    return (
        <div className="image-wrap">
            {/* seo-friendly image tag with title - hidden will keep this tag in document */}
            <img src={url} alt={photo.title} hidden={type === 'contain'} />
            <span
                style={{backgroundImage: `url(${url})`}}
                hidden={type === 'cover'}></span>
            <div className="overlay">
                <div className="overlay-inner">
                    <h4>
                        <span>{photo.title}</span>
                    </h4>
                    <h5>{photo.owner}</h5>
                    {!isFavorite ? (
                        <button
                            className="fav-btn"
                            onClick={() =>
                                dispatch({type: 'makeFavorite', id: photoId})
                            }>
                            <span>Favorite</span>
                            <Loading type="heart" />
                        </button>
                    ) : (
                        ''
                    )}
                </div>
            </div>
            {isFavorite ? (
                <div
                    className="favorite"
                    onClick={() =>
                        dispatch({type: 'removeFavorite', id: photoId})
                    }>
                    <div className="heart-wrap">
                        <div className="heart"></div>
                    </div>
                </div>
            ) : (
                ''
            )}
        </div>
    );
}

export default Image;
