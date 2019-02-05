import axios from 'axios';
import {
    requestBrandKind as apiRequestBrandKind,
    requestBrandList as apiRequestBrandList
} from '../api';
import {ToastEle} from '../component/global';

//-------------------异步接口动作-请求-返回-------------------
const requestKind = data => dispatch => axios.all([
    apiRequestBrandKind(),
    apiRequestBrandList(data)
]).then(
    axios.spread((tabData, listData) =>
        dispatch({
            type: responseKind, payload: {
                kind: tabData.list,
                list: listData.list
            }
        })
    )
).catch(error => ToastEle.showToast(error.message)); //请求品牌团tab、icon、list数据
const responseKind = 'BRAND_QUERY_BANNER';                     //返回品牌团tab、icon、list数据

const requestList = data => dispatch => apiRequestBrandList(data).then(
    listData => dispatch({type: responseKind, payload: {list: listData.list}})
).catch(error => ToastEle.showToast(error.message));
const responseList = 'BRAND_QUERY_LIST';        //返回列表数据

//同步动作
const clickTab = 'BRAND_CLICK_TAB';             //Tab数据切换
const clickIcon = 'BRAND_CLICK_ICON';           //点击icon

export {
    requestKind,
    responseKind,
    requestList,
    responseList,

    clickTab,
    clickIcon,
};
