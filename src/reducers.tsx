export function pageReducer(state = {page: 1}, {type}) {
    switch (type) {
        case 'nextPage':
            return {page: state.page + 1};
        default:
            return state;
    }
}

export function photosReducer(state = null, {type, data}) {
    switch (type) {
        case 'appendPhotos':
            const temp = [...state.photos.photo, ...data.photos.photo];
            data.photos.photo = temp;
            return data;
        default:
            return state;
    }
}
