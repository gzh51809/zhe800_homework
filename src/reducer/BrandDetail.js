import {
    responseData,
    clickItem,
    clickTab
} from '../action/BrandDetail';
import apiConfig from "../api/config";

let defaultState = {
    brandDetail: {},
    brandAreaData: [],
    selectTab: {},
    tabs: [],
    currentList: []
};

function handleData(state, action) {
    let cloneState = {...state};
    cloneState.brandDetail = action.payload.brandDetail;
    cloneState.brandDetail.brandSrc = `http://${location.hostname}:${apiConfig.serverPort}/zhe800${action.payload.brandDetail.brandSrc}`;


    return cloneState;
}

export default (state = defaultState, action) => {
    switch (action.type) {
        case responseData:
            return handleData(state, action);
        case clickItem:
            return {...state};
        case clickTab:
            return {...state};
        default:
            return {...state};
    }
};
