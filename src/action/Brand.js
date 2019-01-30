import axios from 'axios';
import {
    requestBrandKind as apiRequestBrandKind,
    requestBrandList as apiRequestBrandList
} from '../api';

//-------------------异步接口动作-请求-返回-------------------
const requestKind = data => dispatch => axios.all([
    apiRequestBrandKind(),
    apiRequestBrandList(data)
]).then(
    axios.spread((tabData, listData) => {
        if (tabData.data.code === '0' &&
            listData.data.code === '0') {
            dispatch({
                type: responseKind, payload: {
                    kind: tabData.data.list,
                    list: listData.data.list
                }
            });
        } else {
            dispatch({type: responseKind, payload: {kind: [], list: []}});
        }
    })
).catch(
    () => dispatch({type: responseKind, payload: {kind: [], list: []}})
);                                              //请求品牌团tab、icon、list数据
const responseKind = 'BRAND_QUERY_BANNER';      //返回品牌团tab、icon、list数据

const requestList = data => dispatch => axios.all([
    apiRequestBrandList(data)
]).then(
    axios.spread((listData) => {
        if (listData.data.code === '0') {
            dispatch({
                type: responseKind, payload: {
                    list: listData.data.list,
                }
            });
        } else {
            dispatch({type: responseKind, payload: {list: []}});
        }
    })
).catch(
    () => dispatch({type: responseKind, payload: {list: []}})
);
const responseList = 'BRAND_QUERY_LIST';        //返回列表数据

//同步动作
const clickTab = 'BRAND_CLICK_TAB';             //Tab数据切换
const clickIcon = 'BRAND_CLICK_ICON';           //点击icon
const clickDetail = 'DISCOUNT_CLICK_DETAIL';    //点击详情

export {
    requestKind,
    responseKind,
    requestList,
    responseList,

    clickTab,
    clickIcon,
    clickDetail
};
