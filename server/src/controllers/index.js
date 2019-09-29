//主路由文件
const KoaRouter = require('koa-router');
const models = require(':controllers/models');
//所有的API接口都以/v1/api开头
const router = new KoaRouter({ prefix: '/v1/api/' });
//整合路由
Object.keys(models).forEach(key => {
    Object.keys(models[key]).forEach(k2 => {
        router.use((key).toLowerCase(), models[key][k2].routes(), models[key][k2].allowedMethods());
    });
});

// console.log(router);
module.exports = router;
