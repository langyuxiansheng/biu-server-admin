import Vue from 'vue';
// 图片放大
import VueDirectiveImagePreviewer from 'vue-directive-image-previewer';
import 'vue-directive-image-previewer/dist/assets/style.css';
//自定义全局组件
import components from '@/components';
Vue.use(VueDirectiveImagePreviewer, { background: 'rgba(0,0,0,.5)' });
export default () => {
    Object.keys(components).forEach((key) => {
        Vue.component(key, components[key]);
    });
};