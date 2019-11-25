/**
 * Created by Administrator on 2018/1/12 0012.
 * store 公共方法类
 */
import types from './types.js';
const actions = {

    /**
     * 设置权限
     */
    setPermission({ commit, state }, route) {
        commit(types.SET_PERMISSION, route);
    }
};

export default actions;
