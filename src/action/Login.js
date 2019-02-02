import {
    requestAuth as apiRequestAuth,
    requestLogin as apiRequestLogin
} from '../api';

//-------------------异步接口动作-请求-返回-------------------
const requestAuth = () => (dispatch, getState) => {
    let {login: {form}} = getState();
    let mobile = form.find(item => item.tabId === 'mobile' && item.id === 'mobileNumber').value;
    apiRequestAuth({mobile}).then(
        response => response.data.code === '0' && dispatch({type: startCounter, payload: response.data})
    ).catch(
        () => {}
    );
};                                          //请求验证码
const startCounter = 'LOGIN_START_COUNTER'; //返回成功开始倒计时

const responseLogin = 'LOGIN_QUERY_LOGIN';  //返回登录
const requestLogin = () => (dispatch, getState) => {
    let {login: {form, selectTab}} = getState();
    let mobile = form.find(item => item.tabId === 'mobile' && item.id === 'mobileNumber').value;
    let authCode = form.find(item => item.tabId === 'mobile' && item.id === 'auth').value;
    let name = form.find(item => item.tabId === 'account' && item.id === 'user').value;
    let password = form.find(item => item.tabId === 'account' && item.id === 'password').value;

    let data = {};
    if (selectTab.id === 'mobile') {
        data = {mobile, authCode, type: selectTab.id};
    } else {
        data = {name, password, type: selectTab.id};
    }

    apiRequestLogin(data).then(
        response => response.data.code === '0' && dispatch({type: responseLogin, payload: response.data})
    ).catch(
        () => {}
    );
};                                          //请求登录

//--------------------同步动作-用户交互--------------------
const clickTab = 'LOGIN_CLICK_TAB';          //登录点击Tab切换
const inputChange = 'LOGIN_INPUT_CHANGE';    //输入框文字变化
const clickRightIcon = 'LOGIN_CLICK_RIGHT';  //点击右边的ICON

export {
    clickTab,
    inputChange,
    clickRightIcon,

    requestAuth,
    startCounter,
    requestLogin,
    responseLogin
}
