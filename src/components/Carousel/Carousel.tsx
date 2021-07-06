import React, {
    MutableRefObject,
    ReactElement,
    useCallback,
    useRef,
} from 'react';
import {PhotosData} from '../../types';
import Image from '../Image/Image';
import './Carousel.scss';

interface Props {
    data: PhotosData;
    onScrollEnd: () => void;
}

function Carousel({data, onScrollEnd}: Props): ReactElement {
    const photoRef: MutableRefObject<HTMLElement> = useRef(null);
    const callbackFunction = (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
            onScrollEnd();
        }
    };
    const observer = new IntersectionObserver(callbackFunction, {});
    const lastPhotoRef = useCallback((e: HTMLSpanElement) => {
        if (!e) {
            return;
        }
        if (photoRef.current && photoRef.current.id !== e.id) {
            observer.unobserve(photoRef.current);
            photoRef.current = null;
        }
        if (!photoRef.current) {
            photoRef.current = e;
            observer.observe(photoRef.current);
        }
        return () => {
            if (photoRef.current) observer.unobserve(photoRef.current);
        };
    }, []);

    return (
        <div className="carousel-wrap">
            <div className="images-wrap">
                {data.photos.photo.map((photo, i) => (
                    <span
                        id={photo.id}
                        ref={
                            i === data.photos.photo.length - 1
                                ? lastPhotoRef
                                : null
                        }
                        key={photo.id}>
                        <Image photo={photo} type="contain" />
                    </span>
                ))}
            </div>
        </div>
    );
}

export default Carousel;
