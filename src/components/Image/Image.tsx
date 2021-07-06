import Loading from '../Loading/Loading';
import React, {MutableRefObject, ReactElement} from 'react';
import {Photo} from '../../types';
import './Image.scss';

interface Props {
    ref?: MutableRefObject<HTMLElement>;
    photo: Photo;
    type: 'contain' | 'cover';
}

function Image({photo, type}: Props): ReactElement {
    const url = `https://live.staticflickr.com/${photo['server']}/${photo['id']}_${photo['secret']}_w.jpg`;
    return (
        <div className="image-wrap">
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
                    <button className="fav-btn">
                        <span>Favorite</span>
                        <Loading type="heart" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Image;
