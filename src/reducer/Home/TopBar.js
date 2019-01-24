import {
    downloadApp,
} from '../../action/Home';

let handel = (state, payload) => {
    switch (payload.type) {
        case downloadApp:
            return {...state};
        default:
            return {...state};
    }
};

export {handel};
