export interface Photo {
    id: string;
    owner: string;
    secret: string;
    server: string;
    farm: number;
    title: string;
    ispublic: number;
    isfriend: number;
    isfamily: number;
}

export interface Photos {
    page: number;
    pages: number;
    perpage: number;
    total: number;
    photo: Photo[];
}

export interface Extra {
    explore_date: string;
    next_prelude_interval: number;
}

export interface PhotosData {
    photos: Photos;
    extra: Extra;
    stat: string;
}

export type ContextType = {
    state: Store;
    dispatch: any;
};

export type Store = {
    photosReducer?: PhotosData | null;
    favoriteReducer?: string[];
};

export type ActionType = {
    type: string;
    data?: any;
    id?: number;
};

export interface apiParams {
    method: string;
    api_key: string;
    format: string;
    page: number;
    per_page: number;
}

export interface apiProps {
    url: string;
    params: apiParams;
}

export interface Output {
    data: any; // can be customized with the API params
    errors: any; // can be of custom Error based on the app need
    fetching: boolean;
}
