import {
    responseKind,
    responseIcon,
    responseList,

    clickTab,
    clickIcon,
    clickDetail
} from '../action/Brand';

let defaultState = {};

export default (state = defaultState, action) => {
    switch (action.type) {
        case responseKind:
            return {...state};
        case responseIcon:
            return {...state};
        case responseList:
            return {...state};

        case clickTab:
            return {...state};
        case clickIcon:
            return {...state};
        case clickDetail:
            return {...state};
        default:
            return {...state};
    }
};
