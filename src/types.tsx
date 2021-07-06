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
