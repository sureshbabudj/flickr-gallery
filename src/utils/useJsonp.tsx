import {useState, useEffect} from 'react';
import useMemoCompare from './useMemoCompare';

interface Params {
    method: string;
    api_key: string;
    format: string;
    page: number;
    per_page: number;
}

export interface Props {
    url: string;
    params: Params;
}

export interface Output {
    data: any; // can be customized with the API params
    errors: any; // can be of custom Error based on the app need
    fetching: boolean;
}

function jsonFlickrApi(data) {
    // will get called while evaluating the JSONP response
    return data;
}

export default function useJsonp(props: Props): Output {
    const [data, setData] = useState(null);
    const [fetching, setFetching] = useState(false);
    const [errors, setErrors] = useState(null);

    async function fetchData() {
        const params = new URLSearchParams();
        Object.keys(props.params).forEach((i) =>
            params.set(i, props.params[i]),
        );
        try {
            setFetching(true);
            const paramString = params.toString();
            const response = await fetch(`${props.url}?${paramString}`);
            const responseText = await response.text();
            const match = !responseText.startsWith('jsonFlickrApi(');
            if (match) throw new Error('invalid JSONP response');
            const data = eval(responseText);
            setData(data);
            setErrors(null);
            setFetching(false);
        } catch (error) {
            setErrors(error);
            setData(null);
            setFetching(false);
        }
    }

    const queryCached = useMemoCompare(
        {...props.params},
        (prev: Params, next: Params) => {
            return prev && prev.page === next.page;
        },
    );

    useEffect(() => {
        fetchData();
    }, [queryCached]);

    return {data, fetching, errors};
}
