/**
 * 白名单接口
 */
module.exports = [
    /^\/public/, //公共资源
    /^\/_nuxt/, //nuxt页面
    /^\/login/, //登录
    /^\/favicon.ico/,
    /^\/__webpack_hmr/,
    /^\/System/, //系统设置
    /^\/Home/, //主页
    //api部分
    /^\/v1\/api\/common\/getImgValidate/,
    /^\/v1\/api\/common\/userLoginForSysAdmin/
];
