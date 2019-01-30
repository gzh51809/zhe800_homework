import {
    responseKind,
    responseList,

    clickTab,
    clickIcon,
    clickDetail
} from '../action/Brand';
import apiConfig from "../api/config";

let defaultState = {
    kindData: [],
    selectTab: {},
    topTapData: [],
    selectIcon: {},
    currentIcon: [],
    iconData: [],
    listData: [],
    currentList: []
};

function handelKindData(state, action) {
    let cloneState = {...state};
    cloneState.kindData = action.payload.kind;

    cloneState.topTapData = action.payload.kind
        .reduce((target, item) => {
            if (!target.find(json => json.kindId === item.kindId)) {
                target.push({kindId: item.kindId, kindName: item.kindName, kindOrder: item.kindOrder})
            }
            return target;
        }, [])
        .sort((first, second) => first.kindOrder - second.kindOrder);
    cloneState.selectTab = cloneState.topTapData[0];

    cloneState.iconData = action.payload.kind
        .map(item => ({
            kindId: item.kindId,
            iconId: item.iconId,
            iconName: item.iconName,
            iconSrc: `http://${location.hostname}:${apiConfig.serverPort}/zhe800${item.iconSrc}`,
            select: false
        }));
    cloneState.currentIcon = cloneState.iconData.filter(item => item.kindId === cloneState.selectTab.kindId);
    cloneState.selectIcon = cloneState.currentIcon[0];
    cloneState.selectIcon.select = true;

    action.payload.list.forEach(item => item.brandSrc = `http://${location.hostname}:${apiConfig.serverPort}/zhe800${item.brandSrc}`);
    cloneState.listData = action.payload.list;
    cloneState.currentList = cloneState.listData.filter(item => item.kindId === cloneState.selectIcon.kindId && item.iconId === cloneState.selectIcon.iconId);

    return cloneState;
}

export default (state = defaultState, action) => {
    switch (action.type) {
        case responseKind:
            return handelKindData(state, action);
        case responseList:
            return {...state};

        case clickTab:
            return {...state};
        case clickIcon:
        {
            let cloneState = {...state};
            cloneState.iconData.forEach(item => item.select = false);
            cloneState.currentIcon.forEach(item => item.select = false);
            cloneState.selectIcon = cloneState.currentIcon.find(item => item.iconId === action.payload.iconId);
            cloneState.selectIcon.select = true;

            cloneState.currentList = cloneState.listData.filter(item => item.kindId === cloneState.selectIcon.kindId && item.iconId === cloneState.selectIcon.iconId);
            return cloneState;
        }
        case clickDetail:
            return {...state};
        default:
            return {...state};
    }
};
