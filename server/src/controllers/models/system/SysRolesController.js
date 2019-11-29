/**
 * 角色管理
 */
const KoaRouter = require('koa-router');
const SysRolesService = require(':services/system/SysRolesService');
const controller = new KoaRouter();
const service = new SysRolesService();

//添加角色
controller.post('/addSysRole', async(ctx) => {
    ctx.body = await service.addSysRole(ctx.request.body);
});

//获取系统角色
controller.get('/getSysRoleList', async(ctx) => {
    ctx.body = await service.getSysRoleList(ctx.request.query);
});

//删除系统角色
controller.delete('/delSysRoleByIds', async(ctx) => {
    ctx.body = await service.delSysRoleByIds(ctx.request.body);
});

//更新系统角色
controller.put('/updateSysRole', async(ctx) => {
    ctx.body = await service.updateSysRole(ctx.request.body);
});

module.exports = controller;
