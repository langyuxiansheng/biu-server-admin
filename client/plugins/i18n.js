import Vue from 'vue';
// 导入语言国际化插件
import VueI18n from 'vue-i18n';
// 导入语言包
import ZHCN from '@/assets/scripts/i18n/zh-cn';
import ENUS from '@/assets/scripts/i18n/en-us';
Vue.use(VueI18n);
/**
 * 配置语言国际化和自定义语言包
 */
const i18n = new VueI18n({
    locale: 'ZHCN',
    messages: { ZHCN, ENUS }
});
export default ({ app }) => {
    app.i18n = i18n;
    // app.$i18n.locale = 'ENUS'; //动态切换语言
};