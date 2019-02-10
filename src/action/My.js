import {
    requestUserInfo as apiRequestUserInfo
} from '../api';
import {ToastEle} from "../component/global";
//-------------------异步接口动作-请求-返回-------------------
const requestData = () => dispatch => {
    apiRequestUserInfo().then(
        data => dispatch({
            type: responseData,
            payload: data
        })
    ).catch(error => ToastEle.showToast(error.message));
};                                                              //请求用户信息
const responseData = 'MY_QUERY_DATA';                           //返回用户信息

//--------------------同步动作-用户交互--------------------
const clickIcon = 'MY_CLICK_ICON';           //点击icon进入专题页面
const clickItem = 'MY_CLICK_ITEM';           //点击表单

export {
    requestData,
    responseData,

    clickIcon,
    clickItem
};
