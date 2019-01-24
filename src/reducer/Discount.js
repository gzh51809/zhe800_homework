import {
    responseBanner,
    responseKind,
    responseIcon,
    responseAd,
    responseGoods,
    responseList,

    clickTab,
    clickBanner,
    clickIcon,
    clickAd,
    clickDetail
} from '../action/Discount';

let defaultState = {};

export default (state = defaultState, action) => {
    switch (action.type) {
        case responseBanner:
            return {...state};
        case responseKind:
            return {...state};
        case responseIcon:
            return {...state};
        case responseAd:
            return {...state};
        case responseGoods:
            return {...state};
        case responseList:
            return {...state};

        case clickTab:
            return {...state};
        case clickBanner:
            return {...state};
        case clickIcon:
            return {...state};
        case clickAd:
            return {...state};
        case clickDetail:
            return {...state};
        default:
            return {...state};
    }
};
