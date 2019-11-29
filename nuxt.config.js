const pkg = require('./package.json');
module.exports = {
    mode: 'spa', //非单页   //universal
    buildDir: 'nuxt-dist', //打包输出文件夹
    srcDir: 'client/', //设置 Nuxt.js 应用的源码目录
    head: {
        title: pkg.title,
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: pkg.description }
        ],
        link: [
            // { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            { rel: 'stylesheet', href: 'https://at.alicdn.com/t/font_1054677_wrbfln7pseg.css' }
        ]
    },
    loading: { color: '#fff' },
    css: [
        // 'element-ui/lib/theme-chalk/index.css',
        '@/assets/styles/default-theme/theme/index.css',
        '@/assets/styles/common/reset.css',
        '@/assets/styles/common/theme.default.less'
    ],
    plugins: [
        '@/plugins/element-ui',
        '@/plugins/components',
        '@/plugins/i18n',
        '@/plugins/filters',
        '@/plugins/axios'
    ],
    modules: [
        '@nuxtjs/axios'
    ],
    build: {
        extend(config, ctx) {
            if (ctx.isDev && ctx.isClient) {
                config.module.rules.push({
                    enforce: 'pre',
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    exclude: /(node_modules)/
                });
            };
        }
    }
};
