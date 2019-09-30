const path = require('path'); //路径模块

/**
 * 主配置
 */
module.exports = {
    port: 3010, // default: 3000
    host: '127.0.0.1', // default: localhost,
    jwtPublicKey: 'jwtPublicKey', //公钥
    isNuxtRender: true, //是否启用nuxt渲染 启用管理后台
    staticPath: path.join(__dirname, `/server/src/public`), //静态文件路径,相对于 Server.js 的路径
    crawler: {
        start: true, //是否开启爬虫系统
        settimeout: 1 //延时多少s启动
    },
    unlessPath: [ //url白名单 如果不设置默认都是没权限访问的,会返回{code:401}
        /^\/public/, //公共资源
        /^\/_nuxt/, //nuxt页面
        /^\/login/, //登录
        /^\/favicon.ico/,
        /^\/__webpack_hmr/,
        /^\/System/, //系统设置
        /^\/Home/, //主页
        //api部分
        /^\/v1\/api\/common\/getImgValidate/, //验证码
        /^\/v1\/api\/common\/userLoginForSysAdmin/ //登录接口
    ]
};
