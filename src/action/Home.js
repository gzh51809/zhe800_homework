import axios from 'axios';
import {requestKind as apiRequestKind} from '../api';
import {requestGoodList as apiRequestGoodList} from '../api';

//-------------------异步接口动作-请求-返回-------------------
const requestData = (data) => dispatch => axios.all([apiRequestKind(), apiRequestGoodList(data)]).then(
    axios.spread((kindData, listData) => {
        if (kindData.data.code === '0' && listData.data.code === '0') {
            dispatch({type: responseData, payload: {kind: kindData.data.list, list: listData.data.list}});
        } else {
            dispatch({type: responseData, payload: {kind: [], list: []}});
        }
    })
).catch(
    () => dispatch({type: responseData, payload: {kind: [], list: []}})
);                                          //请求首页轮播图、tab、icon、list数据
const responseData = 'HOME_QUERY_DATA';     //返回首页轮播图、tab、icon、list数据

const requestList = (data) => dispatch => apiRequestGoodList(data).then(
    response => {
        if (response.data.code === '0') {
            dispatch({type: responseList, payload: response.data.list});
        } else {
            dispatch({type: responseList, payload: []});
        }
    }
).catch(
    () => dispatch({type: responseList, payload: []})
);
const responseList = 'HOME_QUERY_LIST';     //返回列表数据

//--------------------同步动作-用户交互--------------------
const downloadApp = 'HOME_DOWNLOAD';        //下载APP
const pushSearch = 'HOME_PUSH_SEARCH';      //进入搜索页
const pushKind = 'HOME_PUSH_KIND';          //进入分类页
const clickBanner = 'HOME_CLICK_BANNER';    //点击轮播图
const clickTab = 'HOME_CLICK_TAB';          //Tab数据切换
const clickIcon = 'HOME_CLICK_ICON';        //点击icon进入专题页面
const clickAd = 'HOME_CLICK_AD';            //点击广告进入专题页面
const clickGood = 'HOME_CLICK_GOOD';        //点击进入商品详情页

export {
    requestData,
    responseData,
    requestList,
    responseList,

    downloadApp,
    pushSearch,
    pushKind,
    clickBanner,
    clickTab,
    clickIcon,
    clickAd,
    clickGood
};
