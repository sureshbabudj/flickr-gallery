import React, {ReactElement, useState, useContext} from 'react';
import useJsonp from './utils/useJsonp';
import './styles.scss';
import {FLICKR_ENDPOINT, FLICKR_FORMAT, FLICKR_API_KEY} from './constants';
import Carousel from './components/Carousel/Carousel';
import Loading from './components/Loading/Loading';
import {Context} from './Store';
import {ContextType} from './types';

const App = (): ReactElement => {
    const {state, dispatch} = useContext<ContextType>(Context);
    const photoData = state?.photosReducer;
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
    const callback = (data) => {
        dispatch({type: 'appendPhotos', data});
    };
    const {fetching, errors} = useJsonp(api, callback);

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

    return (
        <div className="wrapper">
            {body}
            {fetching && <Loading type="circles" alignCenter={true} />}
        </div>
    );
};

export default App;
