/**
 * Created by Administrator on 2018/1/12 0012.
 * store 公共方法类
 */

//导入公共状态模块

const getters = {

    getLanguage (state) {
        return state.language;
    },

    aMapKey (state) {
        return state.aMapKey;
    },

    /**
     * 配置文件
     * @param state
     * @return {*}
     */
    config (state) {
        return state.config;
    },

    /**
     * 侧边栏菜单
     * @param state
     * @return {Array}
     */
    sideBarMenus (state) {
        return state.sideBarMenus;
    },

    /**
     * 七牛token
     * @param state
     * @return {null}
     */
    qiNiuToken (state) {
        return state.qiNiuToken;
    },

    /**
     * 路由表
     * @param {*} state
     */
    routeOptions (state) {
        return state.routeOptions;
    }

};

export default getters;
