import React from 'react';
import App from './App';
import {StoreContextProvider} from './Store';
import {mount, ReactWrapper, render} from 'enzyme';
import {act} from 'react-dom/test-utils';
import mockData from '../mock/mock';
import ReactDOM from 'react-dom';
import Carousel from './components/Carousel/Carousel';

const templateFn = () => {
    return (
        <StoreContextProvider>
            <App />
        </StoreContextProvider>
    );
};

// mock fetch
let mockApiErr = false;
(global as any).fetch = jest.fn(() =>
    Promise.resolve({
        text: () => {
            return !mockApiErr
                ? Promise.resolve(
                      `jsonFlickrApi(${JSON.stringify(
                          mockData.photosReducer,
                      )})`,
                  )
                : Promise.reject('fetch failed');
        },
    }),
);

describe('App Component', () => {
    let wrapper: ReactWrapper;
    beforeEach(() => {
        mockApiErr = false;
    });
    it('should render without error', async () => {
        await act(async () => {
            wrapper = await mount(templateFn());
        });
        expect(wrapper.find('div.wrapper').length).toBe(1);
    });

    it('should handle child emitter events and load more photos', async () => {
        let container = document.createElement('div');
        await act(async () => {
            await ReactDOM.render(templateFn(), container);
        });
        // expect(wrapper.find('div.wrapper')).toBe(1);
        expect(container.querySelectorAll('.image-wrap').length).toBe(
            mockData.photosReducer.photos.photo.length,
        );
    });

    it('should handle api error', async () => {
        mockApiErr = true;
        await act(async () => {
            wrapper = await mount(templateFn());
        });
        expect(wrapper.text()).toBe('Failed to fetch');
    });
});
