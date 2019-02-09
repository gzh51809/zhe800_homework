import axios from 'axios';
import {
    requestGoodDetail as apiRequestGoodDetail,
    requestGoodAttribute as apiRequestGoodAttribute
} from '../api';
import {ToastEle} from '../component/global';

//-------------------异步接口动作-请求-返回-------------------
const requestData = data => (dispatch, getState) => {
    if (getState().goodDetail.needData){
        axios.all([
            apiRequestGoodDetail(data),
            apiRequestGoodAttribute(data)
        ]).then(
            axios.spread((goodDetail, goodAttribute) =>
                dispatch({
                    type: responseData, payload: {
                        detail: goodDetail.list,
                        attribute: goodAttribute.list
                    }
                })
            )
        ).catch(error => ToastEle.showToast(error.message));
    }
};                                                             //请求品牌团tab、icon、list数据
const responseData = 'GOODDETAIL_QUERY_DATA';                  //返回品牌团tab、icon、list数据

//同步动作
const scrollBrand = 'GOODDETAIL_SCROLL';                        //记录滚动scrollTop
const addAmount = 'GOODDETAIL_ADD_AMOUNT';                      //添加商品购买数量
const minusAmount = 'GOODDETAIL_MINUS_AMOUNT';                  //减少商品购买数量
const selectAttribute = 'GOODDETAIL_SELECT_ATTRIBUTE';          //选择商品属性
const goodDetailReset = 'GOODDETAIL_RESET';                     //重制状态

export {
    requestData,
    responseData,

    scrollBrand,
    addAmount,
    minusAmount,
    selectAttribute,
    goodDetailReset
};
