/**
 * Vue 全局过滤器
 */

import Vue from 'vue';
import filters from '@/filters';
for (let k in filters) {
    Vue.filter(k, filters[k]);
}
export default ({ app }) => {
    app.$appFilters = filters;
};
