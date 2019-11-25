/**
 * Created by Simple on 2018/1/12 0012.
 * store 公共方法类
 */

// 导入公共状态模块
import types from './types.js';
const mutations = {

    //设置权限
    [types.SET_PERMISSION] (state, data) {
        state.permission = data;
    }
};

export default mutations;
