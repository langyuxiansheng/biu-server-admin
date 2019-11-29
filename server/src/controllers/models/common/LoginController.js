/**
 * 用户登录路由入口
 */
const KoaRouter = require('koa-router');
const LoginService = require(':services/common/LoginService');
const controller = new KoaRouter();
const service = new LoginService();

//系统管理员登录
controller.post('/userLoginForSysAdmin', async(ctx) => {
    ctx.body = await service.userLoginForSysAdmin({ data: ctx.request.body, cookies: ctx.cookies });
});

//商家登录
controller.post('/loginForBusiness', async(ctx) => {
    ctx.body = await service.loginForBusiness({ data: ctx.request.body, cookies: ctx.cookies });
});

module.exports = controller;
