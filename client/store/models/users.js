/**
 * Created by Simple on 2018/1/12 0012.
 * 用户模块
 */
import types from '../types.js';
const state = {
    userInfo: null //用户信息
};

const getters = {

    /**
     * 用户信息
     * @param {*} state
     */
    userInfo(state) {
        const user = window.localStorage.getItem('MU-HOME-USER-INFO');
        if (user) return JSON.parse(user);
        return state.userInfo;
    }

};

const actions = {
    setToken({ commit }, token) {
        commit(types.SET_USER_TOKEN, token);
    }
};

const mutations = {

    /*   [types.GET_OWNER_ITEM](state, data) {
          state.ownerItem = data;
      }, */
};

export default {
    state,
    getters,
    actions,
    mutations
};
