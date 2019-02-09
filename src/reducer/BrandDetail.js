import {
    responseData,
    clickItem,
    clickTab,
    brandDetailReset,
    scrollBrandDetail
} from '../action/BrandDetail';
import apiConfig from "../api/config";
import {scrollHome} from "../action/Home";

let defaultState = {
    needData: true,
    scrollTop: 0,
    brandDetail: {},
    brandAreaData: [],
    selectTab: {},
    tabs: [],
    goodList: [],
    currentList: []
};

function handleData(state, action) {
    let cloneState = {...state};
    cloneState.brandDetail = action.payload.brandDetail;
    cloneState.brandDetail.brandSrc = `http://${location.hostname}:${apiConfig.serverPort}/zhe800${action.payload.brandDetail.brandSrc}`;

    //tab数据处理
    cloneState.tabs = action.payload.goodList.reduce((target, item) => {
        if (!target.find(json => json.kindId === item.kindId)) {
            target.push({
                kindId: item.kindId,
                kindName: item.kindName,
                kindOrder: item.kindOrder
            });
        }

        return target;
    }, []).sort((first, second) => first.kindOrder - second.kindOrder);
    cloneState.selectTab = cloneState.tabs[0];

    //goodList数据处理
    cloneState.goodList = action.payload.goodList.reduce((target, item) => {
        target.push({
            kindId: item.kindId,
            brandId: item.brandId,
            fengmianSrc: `http://${location.hostname}:${apiConfig.serverPort}/zhe800${item.fengmianSrc}`,
            isShockingPrice: item.isShockingPrice,
            originPrice: item.originPrice,
            name: item.name,
            price: item.price,
            saleAmount: item.saleAmount,
            goodId: item.goodId
        });

        return target;
    }, []);
    cloneState.currentList = cloneState.goodList.filter(item => item.kindId === cloneState.selectTab.kindId);
    cloneState.needData = false;

    return cloneState;
}

export default (state = defaultState, action) => {
    switch (action.type) {
        case responseData:
            return handleData(state, action);
        case clickItem:
            return {...state};
        case clickTab: {
            let cloneState = {...state};
            cloneState.selectTab = action.payload;
            cloneState.currentList = cloneState.goodList.filter(item => item.kindId === cloneState.selectTab.kindId);
            return cloneState;
        }
        case brandDetailReset:
        {
            let cloneState = {...state};
            cloneState.needData = true;
            return cloneState;
        }
        case scrollBrandDetail:
        {
            let cloneState = {...state};
            cloneState.scrollTop = action.payload.scrollTop;
            return cloneState;
        }
        default:
            return {...state};
    }
};
