import React, {ReactElement, useState, useEffect} from 'react';
import useJsonp, {Output} from './utils/useJsonp';
import './styles.scss';
import {FLICKR_ENDPOINT, FLICKR_FORMAT, FLICKR_API_KEY} from './constants';
import Carousel from './components/Carousel/Carousel';
import {PhotosData} from './types';
import Loading from './components/Loading/Loading';

const App = (): ReactElement => {
    const [api, setApi] = useState({
        url: FLICKR_ENDPOINT,
        params: {
            method: 'flickr.interestingness.getList',
            api_key: FLICKR_API_KEY,
            format: FLICKR_FORMAT,
            page: 1,
            per_page: 24,
        },
    });
    const {data, fetching, errors} = useJsonp(api);
    const [photoData, setPhotoData] = useState<PhotosData>(null);

    function loadMore(): void {
        if (photoData.photos.pages < api.params.page + 1) {
            return;
        }
        api.params.page = api.params.page + 1;
        setApi({...api});
    }
    let body;
    if (
        photoData &&
        photoData.photos &&
        photoData.photos.photo &&
        photoData.photos.photo.length
    ) {
        body = <Carousel data={photoData} onScrollEnd={loadMore} />;
    } else if (errors) {
        body = <div>{errors}</div>;
    }

    useEffect(() => {
        if (!photoData) {
            setPhotoData(data);
        } else if (photoData.photos.page !== data.photos.page) {
            const temp = [...photoData.photos.photo, ...data.photos.photo];
            data.photos.photo = temp;
            setPhotoData(data);
        }
    }, [data]);

    return (
        <div className="wrapper">
            {body}
            {fetching && <Loading type="circles" alignCenter={true} />}
        </div>
    );
};

export default App;
