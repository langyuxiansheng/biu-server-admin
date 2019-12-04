/**
 * 系统管理员管理
 */
const KoaRouter = require('koa-router');
const SysLogsService = require(':services/system/SysLogsService');
const controller = new KoaRouter();
const service = new SysLogsService();

//获取系统日志
controller.get('/getSysLogList', async(ctx) => {
    ctx.body = await service.getSysLogList(ctx.state.user.data);
});

//获取系统日志内容
controller.get('/getSysLogContent', async(ctx) => {
    ctx.body = await service.getSysLogContent(ctx.request.query, ctx.state.user.data);
});

//删除系统管理员
controller.delete('/delSysLogByPaths', async(ctx) => {
    ctx.body = await service.delSysLogByPaths(ctx.request.body, ctx.state.user.data);
});

module.exports = controller;
