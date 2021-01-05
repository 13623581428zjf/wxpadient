import axios from 'axios';
import Vue from 'vue'
import router from '../router/index';
import store from '@/store/store'
import Vuex from 'vuex'
 Vue.use(Vuex)
import { getSession, removeSession, setSession ,setStore ,getStore,removeStore} from "@/utils/storage";
// 统一请求路径前缀
let base = process.env.API_ROOT;
console.log(base);
// 超时设定
axios.defaults.timeout = 30000;
//请求拦截
axios.interceptors.request.use(config => {
	store.state.isShow=true;
    return config;
}, err => {
    return Promise.resolve(err);
});

// http response 拦截器
axios.interceptors.response.use(response => {
	store.state.isShow=false
    const data = response.data;
    // 根据返回的code值来做不同的处理(和后端约定)
//  console.log(data.code)
    switch (data.code) {
        case 1001:
            if (data.msg == null) {
               console.log(data.msg)
            } else {
                mui.toast(data.msg)
            }
            // 未登录 清除已登录状态
            Cookies.remove('token');
            router.push('/login');
            break;
        case 403:
            // 没有权限
            if (data.msg == null) {
                console.log(data.msg)
            } else {
                mui.toast(data.msg)
            }
            break;
        case 500:
            // 错误
            if (data.msg == null) {
                console.log(data.msg)
            } else {
                 mui.toast(data.msg)
            }
            break;
        case 1000:
            // 错误
            if (data.msg == null) {
                 console.log(data.msg)
            } else {
                mui.toast(data.msg)
            }
            break;
        default:
            return data;
    }
    return data;
}, (err) => {
    mui.toast('服务器异常！')
    // 返回状态码不为200时候的错误处理
    return Promise.reject(err);

});

export const getRequest = (url, params) => {
    return axios({
        method: 'get',
        url: `${base}${url}`,
        params: params,
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'token': getStore('token')
        }
    });
};

export const postRequest = (url, params) => {
    return axios({
        method: 'post',
        url: `${base}${url}`,
        data: params,
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'token': getStore('token')
        }
    });
};

export const putRequest = (url, params) => {
    return axios({
        method: 'put',
        url: `${base}${url}`,
        data: params,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'token': getStore('token')
        }
    });
};

export const deleteRequest = (url, params) => {
   if(getStore('token')){
		var token = setStore('token');
	}
    return axios({
        method: 'delete',
        url: `${base}${url}`,
        data: params,
        headers: {
            'token':getStore('token')
        }
    });
};

export const uploadFileRequest = (url, params) => {
   if(getStore('token')){
		var token = setStore('token');
	}
    return axios({
        method: 'post',
        url: `${base}${url}`,
        data: params,
        headers: {
            'Content-Type': 'multipart/form-data',
            'token': getStore('token')
        }
    });
};