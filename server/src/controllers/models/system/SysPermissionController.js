/**
 * 系统管理员管理
 */
const KoaRouter = require('koa-router');
const { system: { SysPermissionService } } = require(':services');
const controller = new KoaRouter();
const service = new SysPermissionService();

//添加权限菜单
controller.post('/addSysPermission', async(ctx) => {
    ctx.body = await service.addSysPermission(ctx.request.body);
});

//查询权限菜单
controller.get('/getSysPermissionList', async(ctx) => {
    ctx.body = await service.getSysPermissionList(ctx.request.query, ctx.state.user);
});

//删除权限菜单
controller.delete('/delSysPermissionByIds', async(ctx) => {
    ctx.body = await service.delSysPermissionByIds(ctx.request.body);
});

//更新权限菜单
controller.put('/updateSysPermission', async(ctx) => {
    ctx.body = await service.updateSysPermission(ctx.request.body);
});

//权限菜单树形
controller.get('/getSysPermissionListToTree', async(ctx) => {
    ctx.body = await service.getSysPermissionListToTree(ctx.request.query);
});

//获取角色的权限
controller.get('/getSysRolePermissionListToTree', async(ctx) => {
    ctx.body = await service.getSysRolePermissionListToTree(ctx.request.query);
});

//设置角色权限
controller.put('/setSysRolePermission', async(ctx) => {
    ctx.body = await service.setSysRolePermission(ctx.request.body);
});

//清除角色的所有权限
controller.delete('/clearSysRoleAllPermission', async(ctx) => {
    ctx.body = await service.clearSysRoleAllPermission(ctx.request.body);
});

//获取角色的树形菜单
controller.get('/getSysRoleMenusToTree', async(ctx) => {
    const { data } = ctx.state.user;
    ctx.body = await service.getSysRoleMenusToTree(data);
});

module.exports = controller;
