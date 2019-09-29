/**
 * Created by Simple on 2018/1/12 0012.
 * store 公共方法类
 */

// 导入公共状态模块
import types from './types.js';
const mutations = {

    /**
     * 侧边栏导航
     */
    [types.SIDE_BAR_MENUS] (state, data) {
        state.sideBarMenus = data;
    },

    /**
     * 七牛token
     */
    [types.GET_QI_NIU_TOKEN] (state, data) {
        state.qiNiuToken = data;
    },

    /**
     * 路由表
     */
    [types.GET_ROUTE_OPTIONS] (state, data) {
        state.routeOptions = data;
    }

};

export default mutations;
