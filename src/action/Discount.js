import axios from 'axios';
import {
    requestDiscountKind as apiRequestDiscountKind,
    requestDiscountIcon as apiRequestDiscountIcon,
    requestDiscountAd as apiRequestDiscountAd,
    requestDiscountCollection as apiRequestDiscountCollection,
    requestDiscountList as apiRequestDiscountList
} from '../api';

//-------------------异步接口动作-请求-返回-------------------
const requestData = data => dispatch => axios.all([
    apiRequestDiscountKind(),
    apiRequestDiscountIcon(),
    apiRequestDiscountAd(),
    apiRequestDiscountCollection(),
    apiRequestDiscountList(data)
]).then(
    axios.spread((tabData, iconData, adData, collectionData, lisData) => {
        if (tabData.data.code === '0' &&
            iconData.data.code === '0' &&
            adData.data.code === '0' &&
            collectionData.data.code === '0' &&
            lisData.data.code === '0') {
            dispatch({
                type: responseData, payload: {
                    kind: tabData.data.list,
                    icon: iconData.data.list,
                    ad: adData.data.list,
                    collection: collectionData.data.list,
                    list: lisData.data.list
                }
            });
        } else {
            dispatch({type: responseData, payload: {kind: [], icon: [], ad: [], list: []}});
        }
    })
).catch(
    () => dispatch({type: responseData, payload: {kind: [], icon: [], ad: [], list: []}})
);                                              //请求淘特价页轮播图、tab、icon、list数据
const responseData = 'DISCOUNT_QUERY_DATA';     //返回淘特价页轮播图、tab、icon、list数据


//同步动作
const clickTab = 'DISCOUNT_CLICK_TAB';          //Tab数据切换
const clickBanner = 'DISCOUNT_CLICK_BANNER';    //点击轮播图
const clickIcon = 'DISCOUNT_CLICK_ICON';        //点击icon
const clickAd = 'DISCOUNT_CLICK_AD';            //点击广告区
const clickDetail = 'DISCOUNT_CLICK_DETAIL';    //点击详情

export {
    requestData,
    responseData,

    clickTab,
    clickBanner,
    clickIcon,
    clickAd,
    clickDetail
};
