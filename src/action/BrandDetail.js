//-------------------异步接口动作-请求-返回-------------------
import {
    requestBrandDetail as apiRequestBrandDetail,
    requestBrandGoodList as apiRequestBrandGoodList
} from '../api';
import {ToastEle} from '../component/global';
import axios from "axios";

//-------------------异步接口动作-请求-返回-------------------
const requestData = data => dispatch => axios.all([
    apiRequestBrandDetail(data),
    apiRequestBrandGoodList(data)
]).then(
    axios.spread((brandDetail, goodList) =>
        dispatch({
            type: responseData,
            payload: {
                brandDetail: brandDetail.list[0] || {},
                goodList: goodList.list
            }
        })
    )
).catch(error => ToastEle.showToast(error.message));    //请求品牌详情和品牌所属商品
const responseData = 'BRANDDETAIL_QUERY_DATA';                    //返回品牌详情和品牌所属商品

const requestList = data => dispatch => apiRequestBrandGoodList(data).then(
    goodList => dispatch({type: responseList, payload: {goodList: goodList.list}})
).catch(error => ToastEle.showToast(error.message));    //请求品牌所属商品
const responseList = 'BRANDDETAIL_QUERY_LIST';          //返回品牌所属商品

//--------------------同步动作-用户交互--------------------
const clickTab = 'BRANDDETAIL_CLICK_|TAB';              //点击tab
const clickItem = 'BRANDDETAIL_CLICK_ITEM';             //点击商品
const scrollBrandDetail = 'BRANDDETAIL_SCROLL';         //记录滚动scrollTop

export {
    requestData,
    responseData,
    requestList,
    responseList,

    clickTab,
    clickItem,
    scrollBrandDetail
};
