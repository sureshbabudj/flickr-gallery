import React, {useReducer} from 'react';
import {ContextType, Store} from './types';
import {reducers} from './reducers';
import {MY_FLICKR_FAV} from './constants';

const favorites: string[] =
    JSON.parse(localStorage.getItem(MY_FLICKR_FAV)) || [];

export const store: Store = {
    photosReducer: null,
    favoriteReducer: favorites,
};

export const Context = React.createContext<ContextType | undefined>(undefined);

export const StoreContextProvider = (props) => {
    const [state, dispatch] = useReducer(reducers, store);

    return (
        <Context.Provider value={{state, dispatch}}>
            {props.children}
        </Context.Provider>
    );
};
