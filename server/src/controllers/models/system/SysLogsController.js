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

//删除系统管理员
controller.delete('/delSysLogByPaths', async(ctx) => {
    ctx.body = await service.delSysLogByPaths(ctx.request.body, ctx.state.user.data);
});

//更新系统管理员信息
controller.put('/updateSysAdmin', async(ctx) => {
    ctx.body = await service.updateSysAdmin(ctx.request.body);
});

//绑定管理员的角色
controller.put('/bindSysAdminRole', async(ctx) => {
    ctx.body = await service.bindSysAdminRole(ctx.request.body, ctx.state.user.data);
});

//获取管理员的基础信息
controller.get('/getSysAdminBaseInfo', async(ctx) => {
    ctx.body = await service.getSysAdminBaseInfo(ctx.request.query);
});

//编辑系统管理员密码
controller.put('/updateSysPassword', async(ctx) => {
    ctx.body = await service.updateSysPassword({ data: ctx.request.body }, ctx.state.user.data);
});

module.exports = controller;
