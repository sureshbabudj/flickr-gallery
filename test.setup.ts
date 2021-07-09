import '@testing-library/jest-dom';
import {configure} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import {JSDOM} from 'jsdom';
import {setupIntersectionObserverMock} from './mock/testUtils';

declare global {
    namespace NodeJS {
        interface Global {
            document: Document;
            window: Window;
            navigator: Navigator;
        }
    }
}

configure({adapter: new Adapter()});

// const virtualConsole = new JSDOM.createVirtualConsole();
const jsdom = new JSDOM('<!doctype html><html><body></body></html>', {
    url: 'http://localhost'
});
const {window} = jsdom;

function copyProps(src, target) {
    Object.defineProperties(target, {
        ...Object.getOwnPropertyDescriptors(src),
        ...Object.getOwnPropertyDescriptors(target)
    });
}

(global as any).window = window;
global.document = window.document;
(global as any).navigator = {
    userAgent: 'node.js'
};
global.requestAnimationFrame = function (callback) {
    return setTimeout(callback, 0);
};
global.cancelAnimationFrame = function (id) {
    clearTimeout(id);
};
const localStorageMock = (function () {
    let store = {};
    return {
        getItem: function (key) {
            return store[key];
        },
        setItem: function (key, value) {
            store[key] = value.toString();
        },
        clear: function () {
            store = {};
        },
        removeItem: function (key) {
            delete store[key];
        }
    };
})();
Object.defineProperty(window, 'localStorage', {value: localStorageMock});

setupIntersectionObserverMock();

copyProps(window, global);
