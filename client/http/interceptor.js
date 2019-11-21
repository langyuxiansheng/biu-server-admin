/***
 * Created by Simple on 2019年3月25日14:33:01
 * Http请求控制器模块
 */

import axios from 'axios';
import { Loading, Message } from 'element-ui';
import util from '@/lib/util';
// const productionUrl = '';
// const devUrl = 'http://192.168.0.220';
const devUrl = '/';
// axios 配置
axios.defaults.timeout = 1000 * 60 * 5;
// axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? productionUrl : devUrl;
axios.defaults.baseURL = devUrl;
// 配置通用请求动画
let loading = null;

//http request 拦截
axios.interceptors.request.use(config => {
    config.headers.Authorization = util.getCookie(`BIU-SERVER-ADMIN-JWT`);
    loading = Loading.service({
        lock: true,
        text: '拼命加载中...',
        background: 'rgba(255, 255, 255, .1)'
    });
    return config;
}, err => {
    if (loading) loading.close();
    return Promise.reject(err);
});

// http response 拦截
axios.interceptors.response.use(response => {
    let data = {};
    if (response && response.data) {
        const { code, msg } = response.data;
        if (code == 200) {
            data = response.data;
        } else if (code == 401) {
            setTimeout(() => {
                const fullPath = location.pathname;
                location.href = `/login?redirect=${fullPath}`;
            }, 1200);
            Message.error(msg);
        } else {
            Message.error(msg);
        }
    }
    if (loading) loading.close();
    return data;
}, error => {
    if (loading) loading.close();
    Message.error('哎呀~ (ಥ﹏ಥ)网络又开小差了,请稍后刷新重试!');
    return Promise.reject(error.response.data);
});

export default axios;
