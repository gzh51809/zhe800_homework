import {
    responseKind,
    responseAd,
    responseList,

    downloadApp,
    pushSearch,
    pushKind,
    clickBanner,
    clickTab,
    clickIcon,
    clickAd,
    clickGood
} from '../../action/Home';

import apiConfig from '../../api/config';

import * as TopBar from './TopBar';

let defaultState = {
    kindData: [],
    topTapData: [],
    topTabWrapperData: [],
    selectTab: {},
    bannerData: [],
    currentBanner: [],
    iconData: [],
    currentIcon: [],
};

function handelKind(state, action) {
    let data = action.payload;
    let cloneState = {...state};

    cloneState.kindData = data;

    //tab数据分类
    cloneState.topTapData = data.reduce((target, item) => {
        if (!target.find(json => json.tabId === item.tabId)) {
            target.push({
                tabId: item.tabId,
                tabName: item.tabName,
                tabOrder: item.tabOrder
            });
        }

        return target;
    }, []).sort((second, first) => first.order - second.order);
    cloneState.topTabWrapperData = cloneState.topTapData.slice(1);
    cloneState.selectTab = cloneState.topTapData[0];

    //banner数据跟随tab联动
    cloneState.bannerData = data.reduce((target, item) => {
        if (!target.find(json => json.tabId === item.tabId && json.bannerId === item.bannerId)) {
            target.push({
                tabId: item.tabId,
                bannerId: item.bannerId,
                bannerSrc: `http://${location.hostname}:${apiConfig.serverPort}/zhe800${item.bannerSrc}`
            });
        }

        return target;
    }, []);
    cloneState.currentBanner = cloneState.bannerData.filter(item => item.tabId === cloneState.selectTab.tabId);

    //icon数据跟随tab联动
    cloneState.iconData = data.reduce((target, item) => {
        if (!target.find(json => json.tabId === item.tabId && json.iconId === item.iconId)) {
            target.push({
                tabId: item.tabId,
                iconId: item.iconId,
                iconName: item.iconName,
                iconSrc: `http://${location.hostname}:${apiConfig.serverPort}/zhe800${item.iconSrc}`
            });
        }

        return target;
    }, []);
    cloneState.currentIcon = cloneState.iconData.filter(item => item.tabId === cloneState.selectTab.tabId);

    return cloneState;
}

export default (state = defaultState, action) => {
    switch (action.type) {
        case responseKind:
            return handelKind(state, action);
        case responseAd:
            return {...state};
        case responseList:
            return {...state};

        case downloadApp:
            return TopBar.handel(state, action);

        case pushSearch:
            return {...state};
        case pushKind:
            return {...state};
        case clickBanner:
            return {...state};

        case clickTab:
        {
            let cloneState = {...state};
            cloneState.selectTab = action.payload;
            cloneState.topTabWrapperData = cloneState.topTapData.filter(item => item.tabId !== cloneState.selectTab.tabId);
            cloneState.currentBanner = cloneState.bannerData.filter(item => item.tabId === cloneState.selectTab.tabId);
            cloneState.currentIcon = cloneState.iconData.filter(item => item.tabId === cloneState.selectTab.tabId);
            return cloneState;
        }
        case clickIcon:
            return {...state};
        case clickAd:
            return {...state};
        case clickGood:
            return {...state};
        default:
            return {...state};
    }
};
