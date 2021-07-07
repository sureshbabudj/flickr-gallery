import {store} from './Store';
import {ActionType, Store} from './types';
import {MY_FLICKR_FAV} from './constants';

function storeLocalData(favorites: string[]): void {
    const parsed = JSON.stringify(favorites);
    localStorage.setItem(MY_FLICKR_FAV, parsed);
}

export function favoriteReducer(state = store.favoriteReducer, {type, id}) {
    switch (type) {
        case 'makeFavorite':
            if (state.includes(id)) {
                return;
            }
            state = [...state, id];
            storeLocalData(state);
            return state;
        case 'removeFavorite':
            const index = state.findIndex((i) => i === id);
            if (index <= -1) {
                return;
            }
            const temp = [...state];
            temp.splice(index, 1);
            state = temp; // objects are updated as whole to re-render the page  and not by reference
            storeLocalData(state);
            return state;
        default:
            return state;
    }
}

export function photosReducer(state = store.photosReducer, {type, data}) {
    switch (type) {
        case 'appendPhotos':
            if (!state) {
                return {...data};
            }
            const temp = [...state.photos.photo, ...data.photos.photo];
            data.photos.photo = temp;
            return data;
        default:
            return state;
    }
}

export function combineReducers(
    reducers,
): (state: Store, action: ActionType) => Store {
    return (state = {}, action) => {
        const newState = {};
        for (const key in reducers) {
            newState[key] = reducers[key](state[key], action);
        }
        return newState;
    };
}

export const reducers = combineReducers({photosReducer, favoriteReducer});
