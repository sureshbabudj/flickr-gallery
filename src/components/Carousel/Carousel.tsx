import React, {
    MutableRefObject,
    ReactElement,
    useCallback,
    useRef,
    useState
} from 'react';
import {PhotosData} from '../../types';
import Image, {ImageProps} from '../Image/Image';
import './Carousel.scss';

export interface CarouselProps {
    data: PhotosData;
    onScrollEnd: () => void;
}

function Carousel({data, onScrollEnd}: CarouselProps): ReactElement {
    const [renderType, setRenderType] = useState<ImageProps['type']>('contain');
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
            <div className="img-render-select">
                {renderType === 'contain' ? (
                    <button onClick={() => setRenderType('cover')}>
                        Cover
                    </button>
                ) : (
                    <button onClick={() => setRenderType('contain')}>
                        Contain
                    </button>
                )}
            </div>
            <div className="images-wrap">
                {data.photos.photo.map((photo, i) => (
                    <span
                        id={photo.id}
                        ref={
                            // fetching at (totalImages - 4)th image.. as it needs time to load the new photos
                            i === data.photos.photo.length - 4
                                ? lastPhotoRef
                                : null
                        }
                        key={photo.id + i}>
                        <Image photo={photo} type={renderType} />
                    </span>
                ))}
            </div>
        </div>
    );
}

export default Carousel;
