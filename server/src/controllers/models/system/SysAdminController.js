/**
 * 系统管理员管理
 */
const KoaRouter = require('koa-router');
const { system: { SysAdminService } } = require(':services');
const controller = new KoaRouter();
const service = new SysAdminService();

//添加
controller.post('/addSysAdmin', async(ctx) => {
    ctx.body = await service.addSysAdmin(ctx.request.body, ctx.state.user.data);
});

//查询系统管理员
controller.get('/getSysAdminList', async(ctx) => {
    ctx.body = await service.getSysAdminList(ctx.request.query, ctx.state.user.data);
});

//删除系统管理员
controller.delete('/delSysAdminByIds', async(ctx) => {
    ctx.body = await service.delSysAdminByIds(ctx.request.body, ctx.state.user.data);
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
