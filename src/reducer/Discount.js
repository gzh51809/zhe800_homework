import {
    responseData,

    clickTab,
    clickBanner,
    clickIcon,
    clickAd,
    clickDetail,
    scrollDiscount
} from '../action/Discount';
import apiConfig from "../api/config";

let defaultState = {
    needData: true,
    scrollTop: 0,
    tabs: [
        {id: 'home', icon: "icon-jinritemai", name: '今日特卖'},
        {id: 'discount', icon: "icon-taotejia", name: '淘特价'},
        {id: 'brand', icon: "icon-pinpaituan", name: '品牌团'},
        {id: 'car', icon: "icon-gouwuche", name: '购物车'},
        {id: 'my', icon: "icon-wode", name: '我的'},
    ],
    kindData: [],
    selectTab: {},
    topTapData: [],
    banner: [],
    currentBanner: [],
    iconData: [],
    adData: [],
    collectionData: [],
    listData: [],
    currentList: []
};

//处理tab、轮播图、icon、广告、列表之间的数据联动
function handelData(state, action) {
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

    cloneState.banner = action.payload.kind
        .map(item => ({kindId: item.kindId, bannerId: item.bannerId, bannerSrc: `http://${location.hostname}:${apiConfig.serverPort}/zhe800${item.bannerSrc}`}));
    cloneState.currentBanner = cloneState.banner.filter(item => item.kindId === cloneState.selectTab.kindId);

    action.payload.icon.forEach(item => item.iconSrc = `http://${location.hostname}:${apiConfig.serverPort}/zhe800${item.iconSrc}`);
    cloneState.iconData = action.payload.icon;

    action.payload.ad.forEach(item => item.adSrc = `http://${location.hostname}:${apiConfig.serverPort}/zhe800${item.adSrc}`);
    cloneState.adData = action.payload.ad;

    action.payload.collection.forEach(item => item.fengmianSrc = `http://${location.hostname}:${apiConfig.serverPort}/zhe800${item.fengmianSrc}`);
    cloneState.collectionData = action.payload.collection;

    action.payload.list.forEach(item => item.fengmianSrc = `http://${location.hostname}:${apiConfig.serverPort}/zhe800${item.fengmianSrc}`);
    cloneState.listData = action.payload.list.reduce((target, json) => {
        if (!Boolean(target.find(item => item._id === json._id))) {
            target.push(json);
        }

        return target;
    }, cloneState.listData);
    cloneState.currentList = cloneState.listData.filter(item => item.kindId === cloneState.selectTab.kindId);
    cloneState.needData = false;
    return cloneState;
}

export default (state = defaultState, action) => {
    switch (action.type) {
        case responseData:
            return handelData(state, action);

        case clickTab:
        {
            let cloneState = {...state};
            cloneState.currentBanner = cloneState.banner.filter(item => item.kindId === action.payload.kindId);
            cloneState.selectTab = action.payload;
            cloneState.currentList = cloneState.listData.filter(item => item.kindId === cloneState.selectTab.kindId);
            return cloneState;
        }
        case clickBanner:
            return {...state};
        case scrollDiscount:
        {
            let cloneState = {...state};
            cloneState.scrollTop = action.payload.scrollTop;
            return cloneState;
        }
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
