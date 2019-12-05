//主路由文件
const KoaRouter = require('koa-router');
const models = require(':controllers/models');
const result = require(':lib/Result');
//所有的API接口都以/v1/api开头
const router = new KoaRouter({ prefix: '/v1/api/' });
//整合路由
Object.keys(models).forEach(key => {
    Object.keys(models[key]).forEach(k2 => {
        router.use((key).toLowerCase(), models[key][k2].routes(), models[key][k2].allowedMethods());
    });
});

/**
 * 所有的非法请求全都返回统一结果
 */
router.all('*', (ctx) => {
    ctx.body = result.failed(`非法请求!`);
});

// console.log(router);
module.exports = router;
