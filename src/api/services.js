import axios from 'axios';
import config from './config';

import {LoadingEle, ToastEle} from '../component/global';

const services = axios.create({
    baseURL: `http://${location.hostname}:${config.serverPort}/zhe800Interface/`,
    method: 'post',
    timeout: 2000
});

//---------------请求拦截----------------
services.interceptors.request.use(
    config => {
        LoadingEle.showLoading();

        config.headers['Content-Type'] = 'application/json';
        localStorage.token && (config.headers['Authorization'] = localStorage.getItem('token'));
        return config;
    },
    error => {
        LoadingEle.hideLoading();

        ToastEle.showToast(`请求失败：${String(error.description)}`);
        return Promise.reject(error);
    }
);

//---------------响应拦截---------------
services.interceptors.response.use(
    response => {
        LoadingEle.hideLoading();
        if (response.status === 200) {
            //接口请求成功更新token
            if (response.data.code === '0') {
                response.headers.authorization && localStorage.setItem('token', response.headers.authorization);
                return response.data;
            }

            //超时跳转登录，部分接口需要
            if (response.data.code === '2') {
                //删除token，跳转至登录页
                localStorage.removeItem('token');
                return response.data;
            }

            return Promise.reject(new Error(`请求失败：${response.data.message}`));
        }
        return Promise.reject(new Error(`请求失败：${response.status}`));
    },
    error => {
        LoadingEle.hideLoading();
        ToastEle.showToast(`请求失败：${String(error.description)}`);

        return Promise.reject(error);
    }
);

export default services;
