import {requestKind as apiRequestKind} from '../api';
import {requestGoodList as apiRequestGoodList } from '../api';

//-------------------异步接口动作-请求-返回-------------------
const requestKind = () => dispatch => apiRequestKind().then(
    response => {
        if (response.data.code === '0') {
            dispatch({type: responseKind, payload: response.data.list});
        } else {
            dispatch({type: responseKind, payload: []});
        }
    }
).catch(
    () => dispatch({type: responseKind, payload: []})
);                                          //请求首页轮播图、tab、icon数据
const responseKind = 'HOME_QUERY_KIND';     //返回首页轮播图、tab、icon数据

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
    requestKind,
    responseKind,
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
