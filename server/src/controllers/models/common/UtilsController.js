/**
 * 用户登录路由入口
 */
const KoaRouter = require('koa-router');
const { common: { UtilsService } } = require(':services');
const controller = new KoaRouter();
const service = new UtilsService();
//登录
controller.get('/getImgValidate', async(ctx) => {
    const res = await service.getImgValidate();
    //设置验证码
    ctx.cookies.set('IMG-VALIDATE-DATA', res.data.text, { httpOnly: true, maxAge: 1000 * 60 * 5 });
    ctx.body = res;
});
module.exports = controller;