import React, {useCallback} from 'react';
import Carousel, {CarouselProps} from './Carousel';
import {mount, ReactWrapper} from 'enzyme';
import mockData from '../../../mock/mock';

// mock child components
jest.mock('../Image/Image', () => 'img');

// util for template
const templateFn = (props) => {
    return <Carousel {...props} />;
};

// emitter mock
const mockOnScrollEnd = () => {
    console.log('fetching new photos');
    return true;
};

describe('Image Component', () => {
    let props: CarouselProps = {
        data: mockData.photosReducer,
        onScrollEnd: mockOnScrollEnd,
    };

    let wrapper: ReactWrapper;

    it('should render without error', () => {
        wrapper = mount(templateFn(props));
        expect(wrapper.find('div.carousel-wrap')).toBeTruthy();
    });

    it('should render child', () => {
        wrapper = mount(templateFn(props));
        expect(wrapper.find('span').length).toBe(
            mockData.photosReducer.photos.photo.length,
        );
    });

    it('should trigger fetch when end of the page', () => {
        wrapper = mount(templateFn(props));
        const temp = {...mockData};
        const newPhotos = [...temp.photosReducer.photos.photo];
        newPhotos.forEach((i) => (i.id = i.id + 1000));
        temp.photosReducer.photos.photo = [
            ...temp.photosReducer.photos.photo,
            ...newPhotos,
        ];
        wrapper.setProps({...props, data: temp.photosReducer});
        wrapper.update();

        expect(wrapper.find('span').length).toBe(
            temp.photosReducer.photos.photo.length,
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });
});
