import React, {ReactElement} from 'react';
import './Loading.scss';

export interface LoadingProps {
    type?: 'dual-ring' | 'circles' | 'heart';
    alignCenter?: boolean;
}

function Loading({type, alignCenter}: LoadingProps): ReactElement {
    let body;

    switch (type) {
        case 'dual-ring':
            body = (
                <div className="ring">
                    <div className="ring-child"></div>
                    <div className="ring-child"></div>
                    <div className="ring-child"></div>
                    <div className="ring-child"></div>
                </div>
            );
            break;
        case 'circles':
            body = (
                <div className="circles">
                    <div className="circle"></div>
                    <div className="circle2"></div>
                </div>
            );
            break;
        case 'heart':
            body = (
                <div className="heart-wrap">
                    <div className="heart heart-animation"></div>
                </div>
            );
            break;
        default:
            body = <span>Loading...</span>;
    }

    return (
        <div className={`${alignCenter ? 'alignCenter' : ''} loading`}>
            {body}
        </div>
    );
}

export default Loading;
