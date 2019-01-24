import {
    responseLogin,
    responseRegister,

    clickIcon,
    clickItem,
} from '../action/My';

let defaultState = {};

export default (state = defaultState, action) => {
    switch (action.type) {
        case responseLogin:
            return {...state};
        case responseRegister:
            return {...state};
        case clickIcon:
            return {...state};
        case clickItem:
            return {...state};
        default:
            return {...state};
    }
};
