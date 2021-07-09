import {useState, useEffect} from 'react';
import {Output, apiProps, apiParams} from '../types';
import useMemoCompare from './useMemoCompare';

function jsonFlickrApi(data) {
    // will get called while evaluating the JSONP response
    return data;
}

export default function useJsonp(
    props: apiProps,
    callback?: (data?: any) => any
): Output {
    const [data, setData] = useState(null);
    const [fetching, setFetching] = useState(false);
    const [errors, setErrors] = useState(null);

    async function fetchData() {
        const params = new URLSearchParams();
        Object.keys(props.params).forEach((i) =>
            params.set(i, props.params[i])
        );
        try {
            setFetching(true);
            const paramString = params.toString();
            const response = await fetch(`${props.url}?${paramString}`);
            const responseText = await response.text();
            const match = !responseText.startsWith('jsonFlickrApi(');
            if (match) {
                const err = 'invalid JSONP response';
                setErrors(err);
                throw new Error(err);
            }
            const data = eval(responseText);
            setData(data);
            setErrors(null);
            if (typeof callback === 'function') {
                callback(data);
            }
            setFetching(false);
        } catch (error) {
            setErrors('Failed to fetch');
            setData(null);
            setFetching(false);
        }
    }

    const queryCached = useMemoCompare(
        {...props.params},
        (prev: apiParams, next: apiParams) => {
            return prev && prev.page === next.page;
        }
    );

    useEffect(() => {
        fetchData();
    }, [queryCached]);

    return {data, fetching, errors};
}
