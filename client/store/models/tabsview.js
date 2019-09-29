/**
 * Created by Simple on 2018/4/26 0020.
 * 标签导航
 */
const state = {
    visitedViews: [],
    cachedViews: []
};

const getters = {

    /**
     * 当前标签
     * @param state
     * @return {Array|*}
     */
    visitedViews(state) {
        return state.visitedViews;
    },

    /**
     * 缓存标签
     * @param state
     * @return {Array|*}
     */
    cachedViews(state) {
        return state.cachedViews;
    }
};

const actions = {

    /**
     * 新增标签
     * @param commit
     * @param view
     */
    addVisitedViews({ commit }, view) {
        commit('ADD_VISITED_VIEWS', view);
    },

    /**
     * 关闭当前标签
     * @param commit
     * @param state
     * @param view
     * @return {Promise}
     */
    delVisitedViews({ commit, state }, view) {
        return new Promise((resolve) => {
            commit('DEL_VISITED_VIEWS', view);
            resolve([...state.visitedViews]);
        });
    },

    /**
     * 关闭其它标签
     * @param commit
     * @param state
     * @param view
     * @return {Promise}
     */
    delOthersViews({ commit, state }, view) {
        return new Promise((resolve) => {
            commit('DEL_OTHERS_VIEWS', view);
            resolve([...state.visitedViews]);
        });
    },

    /**
     * 关闭所有标签
     * @param commit
     * @param state
     * @return {Promise}
     */
    delAllViews({ commit, state }) {
        return new Promise((resolve) => {
            commit('DEL_ALL_VIEWS');
            resolve([...state.visitedViews]);
        });
    }
};

const mutations = {

    /**
     * 新增标签
     * @param state
     * @param view
     * @constructor
     */
    ADD_VISITED_VIEWS: (state, view) => {
        if (state.visitedViews.some(v => v.path === view.path)) return;
        state.visitedViews.push({
            name: view.name,
            path: view.path,
            title: view.title || view.name || '欢迎页'
        });

        if (!view.meta.noCache) {
            state.cachedViews.push(view.name);
        }
    },

    /**
     * 关闭当前标签
     * @param state
     * @param view
     * @constructor
     */
    DEL_VISITED_VIEWS: (state, view) => {
        for (const [i, v] of state.visitedViews.entries()) {
            if (v.path === view.path) {
                state.visitedViews.splice(i, 1);
                break;
            }
        }

        for (const i of state.cachedViews) {
            if (i === view.name) {
                const index = state.cachedViews.indexOf(i);
                state.cachedViews.splice(index, 1);
                break;
            }
        }
    },

    /**
     * 关闭其他标签
     * @param state
     * @param view
     * @constructor
     */
    DEL_OTHERS_VIEWS: (state, view) => {
        for (const [i, v] of state.visitedViews.entries()) {
            if (v.path === view.path) {
                state.visitedViews = state.visitedViews.slice(i, i + 1);
                break;
            }
        }
        for (const i of state.cachedViews) {
            if (i === view.name) {
                const index = state.cachedViews.indexOf(i);
                state.cachedViews = state.cachedViews.slice(index, i + 1);
                break;
            }
        }
    },

    /**
     * 关闭所有标签
     * @param state
     * @constructor
     */
    DEL_ALL_VIEWS: (state) => {
        state.visitedViews = [];
        state.cachedViews = [];
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
