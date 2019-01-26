import {
    responseKind,
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
    adData: [],
    currentAd: {},
    listData: [],
    currentList: []
};

//处理tab、轮播图、icon、广告之间的数据联动
function handelKind(state, action) {
    let data = action.payload;
    let cloneState = {...state};

    cloneState.kindData = data;

    //tab数据分类
    cloneState.topTapData = data.reduce((target, item) => {
        if (!target.find(json => json.kindId === item.kindId)) {
            target.push({
                kindId: item.kindId,
                kindName: item.kindName,
                kindOrder: item.kindOrder
            });
        }

        return target;
    }, []).sort((first, second) => first.kindOrder - second.kindOrder);
    cloneState.topTabWrapperData = cloneState.topTapData;
    cloneState.selectTab = cloneState.topTapData[0];

    //banner数据跟随tab联动
    cloneState.bannerData = data.reduce((target, item) => {
        if (!target.find(json => json.kindId === item.kindId && json.bannerId === item.bannerId)) {
            target.push({
                kindId: item.kindId,
                bannerId: item.bannerId,
                bannerSrc: `http://${location.hostname}:${apiConfig.serverPort}/zhe800${item.bannerSrc}`
            });
        }

        return target;
    }, []);
    cloneState.currentBanner = cloneState.bannerData.filter(item => item.kindId === cloneState.selectTab.kindId);

    //icon数据跟随tab联动
    cloneState.iconData = data.reduce((target, item) => {
        if (!target.find(json => json.kindId === item.kindId && json.iconId === item.iconId)) {
            target.push({
                kindId: item.kindId,
                iconId: item.iconId,
                iconName: item.iconName,
                iconSrc: `http://${location.hostname}:${apiConfig.serverPort}/zhe800${item.iconSrc}`
            });
        }

        return target;
    }, []);
    cloneState.currentIcon = cloneState.iconData.filter(item => item.kindId === cloneState.selectTab.kindId);

    //下面的gif广告区跟随tab联动
    cloneState.adData = data.reduce((target, item) => {
        if (!target.find(json => json.kindId === item.kindId)) {
            target.push({
                kindId: item.kindId,
                galleryId: item.galleryId,
                gallerySrc: `http://${location.hostname}:${apiConfig.serverPort}/zhe800${item.gallerySrc}`,
                leftBigId: item.galleryId,
                leftBigSrc: `http://${location.hostname}:${apiConfig.serverPort}/zhe800${item.leftBigSrc}`,
                rightBottomLeftId: item.galleryId,
                rightBottomLeftSrc: `http://${location.hostname}:${apiConfig.serverPort}/zhe800${item.rightBottomLeftSrc}`,
                rightBottomRightId: item.galleryId,
                rightBottomRightSrc: `http://${location.hostname}:${apiConfig.serverPort}/zhe800${item.rightBottomRightSrc}`,
                rightTopId: item.galleryId,
                rightTopSrc: `http://${location.hostname}:${apiConfig.serverPort}/zhe800${item.rightTopSrc}`,
            });
        }

        return target;
    }, []);
    cloneState.currentAd = cloneState.adData.filter(item => item.kindId === cloneState.selectTab.kindId)[0];

    return cloneState;
}

//处理tab、下部列表之间的数据联动
function handelList(state, action) {
    let data = action.payload;
    let cloneState = {...state};

    cloneState.listData = cloneState.listData.concat(action.payload.map(item => {
        let clone = {...item};
        clone.fengmianSrc = `http://${location.hostname}:${apiConfig.serverPort}/zhe800${item.fengmianSrc}`;

        return clone;
    }));

    //除重
    let idArray = [...new Set(cloneState.listData.map(item => item._id))];
    cloneState.listData = idArray.map(id => cloneState.listData.find(item => item._id === id));
    cloneState.currentList = cloneState.listData.filter(item => item.kindId === cloneState.selectTab.kindId);

    return cloneState;
}

export default (state = defaultState, action) => {
    switch (action.type) {
        case responseKind:
            return handelKind(state, action);
        case responseList:
            return handelList(state, action);

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
            cloneState.currentBanner = cloneState.bannerData.filter(item => item.kindId === cloneState.selectTab.kindId);
            cloneState.currentIcon = cloneState.iconData.filter(item => item.kindId === cloneState.selectTab.kindId);
            cloneState.currentAd = cloneState.adData.filter(item => item.kindId === cloneState.selectTab.kindId)[0];
            cloneState.currentList = cloneState.listData.filter(item => item.kindId === cloneState.selectTab.kindId);
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
