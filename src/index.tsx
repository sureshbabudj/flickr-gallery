import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import {StoreContextProvider} from './Store';

ReactDOM.render(
    <React.StrictMode>
        <StoreContextProvider>
            <App />
        </StoreContextProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
