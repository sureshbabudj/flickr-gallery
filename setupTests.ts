// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import {configure} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import {JSDOM} from 'jsdom';

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
    url: 'http://localhost',
});
const {window} = jsdom;

function copyProps(src, target) {
    Object.defineProperties(target, {
        ...Object.getOwnPropertyDescriptors(src),
        ...Object.getOwnPropertyDescriptors(target),
    });
}

(global as any).window = window;
(global as any).document = window.document;
(global as any).navigator = {
    userAgent: 'node.js',
};
(global as any).requestAnimationFrame = function (callback) {
    return setTimeout(callback, 0);
};
(global as any).cancelAnimationFrame = function (id) {
    clearTimeout(id);
};
copyProps(window, global);
