import React from 'react';
import Image, {ImageProps} from './Image';
import {StoreContextProvider} from '../../Store';
import {mount, ReactWrapper} from 'enzyme';

const templateFn = (props) => {
    return (
        <StoreContextProvider>
            <Image {...props} />
        </StoreContextProvider>
    );
};

describe('Image Component', () => {
    let props: ImageProps = {
        photo: {
            farm: 66,
            id: '51296469889',
            isfamily: 0,
            isfriend: 0,
            ispublic: 1,
            owner: '150839674@N04',
            secret: 'c137e20d84',
            server: '65535',
            title: 'Sunset in the  marshes',
        },
        type: 'cover',
    };

    it('should render without error', () => {
        const wrapper: ReactWrapper = mount(templateFn(props));
        expect(wrapper.find('div.image-wrap')).toBeTruthy();
    });

    it('should render the images based on type', async () => {
        // confirm the prop that need to asserted
        const wrapper: ReactWrapper = mount(templateFn(props));
        expect(wrapper.find('Image').props().type).toEqual('cover');
        expect(wrapper.find('Image').find('img').prop('hidden')).toBe(false);

        // update with some different props
        wrapper.setProps({
            children: <Image photo={props.photo} type="contain" />,
        });
        expect(wrapper.find(Image).props().type).toEqual('contain');
        expect(wrapper.find('Image').find('img').prop('hidden')).toBe(true);
    });

    it("should update the image as user's favorite when clicked", async () => {
        // confirm image is not a favorite one
        const wrapper: ReactWrapper = mount(templateFn(props));
        expect(wrapper.exists('.fav-btn')).toEqual(true);
        expect(wrapper.exists('.favorite')).toBe(false);

        // make favorite
        wrapper.find('.fav-btn').simulate('click');
        expect(wrapper.exists('.fav-btn')).toBe(false);
        expect(wrapper.exists('.favorite')).toEqual(true);

        // remove favorite
        wrapper.find('.favorite').simulate('click');
        expect(wrapper.exists('.fav-btn')).toBe(true);
        expect(wrapper.exists('.favorite')).toEqual(false);
    });
});
