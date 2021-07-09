import {renderHook, act} from '@testing-library/react-hooks';
import {FLICKR_API_KEY, FLICKR_FORMAT} from '../constants';
import {apiProps, Output, PhotosData} from '../types';
import useJsonp from './useJsonp';
import mockData from '../../mock/mock';

const actualMockResponse = `jsonFlickrApi(${JSON.stringify(
    mockData.photosReducer
)})`;

describe('useJsonp hook', () => {
    // mock fetch
    let mockApiErr = false;
    let mockResponse = actualMockResponse;
    (global as any).fetch = jest.fn(() =>
        Promise.resolve({
            text: () => {
                return !mockApiErr
                    ? Promise.resolve(mockResponse)
                    : Promise.reject('fetch failed');
            }
        })
    );

    let jsonpData: PhotosData = null;
    let props: apiProps = {
        url: 'https://mock.test/url',
        params: {
            method: 'flickr.interestingness.getList',
            api_key: FLICKR_API_KEY,
            format: FLICKR_FORMAT,
            page: 1,
            per_page: 10
        }
    };
    const callback = (data: PhotosData) => {
        jsonpData = data;
    };

    beforeEach(() => {
        mockApiErr = false;
        jsonpData = null;
        mockResponse = actualMockResponse;
    });

    it('should fetch JSONP data', async () => {
        const mockCallback = jest.fn(callback);
        let output;
        await act(async () => {
            output = await renderHook(async () =>
                useJsonp(props, mockCallback)
            );
        });
        const current = await output.result.current;
        expect(current.errors).toEqual(null);
        expect(jsonpData.photos.photo.length).toBe(
            mockData.photosReducer.photos.photo.length
        );
        expect(mockCallback.mock.calls.length).toBe(1);
    });

    it('should handle JSONP data format and callback', async () => {
        let mockCallback = undefined;
        await act(async () => {
            await renderHook(async () => useJsonp(props, mockCallback));
        });

        // initializing the callback
        mockCallback = jest.fn(callback);
        // Asserting the callbacks have not been made
        expect(mockCallback.mock.calls.length).toBe(0);

        mockResponse = 'no callback in this response';
        let output;
        await act(async () => {
            output = await renderHook(async () =>
                useJsonp(props, mockCallback)
            );
        });
        const current = await output.result.current;
        expect(current.errors).toEqual('Failed to fetch');
        expect(mockCallback.mock.calls.length).not.toBe(1);
    });

    it('should handle err while fetching JSONP data', async () => {
        const mockCallback = jest.fn(callback);
        mockApiErr = true;
        await act(async () => {
            await renderHook(async () => useJsonp(props, mockCallback));
        });
        // The function was not called in case of err
        expect(mockCallback.mock.calls.length).not.toBe(1);
    });
});
