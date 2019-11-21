/**
 * 权限管理
 */
const result = require(':lib/Result');
const { MODELS_PATH, listToTree } = require(':lib/Utils');
const { Attrs, SOP, BiuDB, COL } = require(':lib/sequelize');
const SysPermissionModel = BiuDB.import(`${MODELS_PATH}/system/SysPermissionModel`);
const SysRolesAuthModel = BiuDB.import(`${MODELS_PATH}/system/SysRolesAuthModel`);
module.exports = class {
    // constructor() {
    //     // SysPermissionModel.sync().then((res) => {
    //     //     console.log(`SysPermissionModel 同步成功`, res);
    //     // });
    //     // SysRolesAuthModel.sync().then((res) => {
    //     //     console.log(`SysRolesAuthModel 同步成功`, res);
    //     // });
    // }

    /**
     * 添加系统权限菜单
     * @param {*} user
     */
    async addSysPermission(data) {
        const { title, path, name } = data;
        if (!title || !path || !name) return result.paramsLack();
        try {
            //查询账号是否存在
            const count = await SysPermissionModel.count({
                where: { title, path, isDelete: false }
            });
            if (count > 0) return result.failed('菜单已存在!');
            await SysPermissionModel.create(data); //保存数据
            return result.success();
        } catch (error) {
            console.log(error);
            return result.failed(error);
        }
    }

    /**
     * 获取系统权限菜单列表
     * @param {*} param0
     */
    async getSysPermissionList({ title, page, limit }) {
        let queryData = {
            where: { isDelete: false },
            order: [
                ['sort', 'ASC']
            ],
            attributes: { exclude: ['isDelete'] }
        };
        if (title) {
            queryData.where['title'] = {
                [SOP.like]: `%${title}%`
            };
        }
        //分页
        if (page && limit) {
            queryData.offset = Number((page - 1) * limit); //开始的数据索引
            queryData.limit = Number(limit); //每页限制返回的数据条数
        };
        try {
            const { rows, count } = await SysPermissionModel.findAndCountAll(queryData);
            return result.success(null, { list: rows, total: count });
        } catch (error) {
            console.log(error);
            return result.failed(error);
        }
    }

    /**
     * 删除系统权限菜单
     * @param {*} param0
     */
    async delSysPermissionByIds({ ids, isDelete }) {
        if (!ids || !isDelete || !Array.isArray(ids)) return result.paramsLack();
        try {
            //批量软删除
            const del = {
                where: {
                    [SOP.or]: [{ permissionId: ids }, { parentId: ids }]
                }
            };
            await SysPermissionModel.update({ isDelete }, del);
            //从中间表删除对应的权限
            SysRolesAuthModel.destroy({
                where: {
                    [SOP.or]: [{ permissionId: ids }, { parentId: ids }]
                }
            });
            return result.success();
        } catch (error) {
            console.log(error);
            return result.failed(error);
        }
    }

    /**
     * 编辑系统权限菜单
     * @param {*} data
     */
    async updateSysPermission(data) {
        if (!data.permissionId) return result.paramsLack();
        try {
            await SysPermissionModel.update(data, { where: { permissionId: data.permissionId } });
            return result.success();
        } catch (error) {
            console.log(error);
            return result.failed(error);
        }
    }

    /**
     * 获取树状菜单
     * @param {*} param0
     */
    async getSysPermissionListToTree({ title, page, limit }) {
        let queryData = {
            where: { isDelete: false },
            order: [
                // ['createdTime', 'DESC'],
                ['sort', 'ASC']
            ],
            attributes: ['permissionId', 'parentId', 'title', 'path', 'find', 'add', 'edit', 'del', 'list']
        };
        if (title) {
            queryData.where['title'] = {
                [SOP.like]: `%${title}%`
            };
        }
        //分页
        if (page && limit) {
            queryData.offset = Number((page - 1) * limit); //开始的数据索引
            queryData.limit = Number(limit); //每页限制返回的数据条数
        };
        try {
            let { rows, count } = await SysPermissionModel.findAndCountAll(queryData);
            const list = listToTree(rows, 'parentId', 'permissionId', 0);
            return result.success(null, { list, total: count });
        } catch (error) {
            console.log(error);
            return result.failed(error);
        }
    }

    /**
     * 获取角色的权限
     * @param {*} param0
     */
    async getSysRolePermissionListToTree({ roleId, title, page, limit }) {
        if (!roleId) return result.paramsLack();
        let queryData = {
            where: { isDelete: false },
            order: [
                // ['createdTime', 'DESC'],
                ['sort', 'ASC']
            ],
            attributes: ['permissionId', 'parentId', 'title', 'path', 'find', 'add', 'edit', 'del', 'list']
        };
        if (title) {
            queryData.where['title'] = {
                [SOP.like]: `%${title}%`
            };
        }
        //查询中间表
        let queryAuth = {
            where: { roleId },
            attributes: { exclude: ['createdTime', 'updatedTime'] }
        };

        //分页
        if (page && limit) {
            queryData.offset = Number((page - 1) * limit); //开始的数据索引
            queryData.limit = Number(limit); //每页限制返回的数据条数
        };
        try {
            let { rows, count } = await SysPermissionModel.findAndCountAll(queryData);
            const auths = await SysRolesAuthModel.findAll(queryAuth);
            //处理已有权限的菜单
            if (auths && auths.length) {
                const list = rows.map((item) => {
                    auths.forEach(auth => {
                        if (auth.permissionId === item.permissionId) {
                            item.find = auth.find;
                            item.add = auth.add;
                            item.edit = auth.edit;
                            item.del = auth.del;
                            item.list = auth.list;
                        }
                    });
                    return item;
                });
                //转为树形结构
                return result.success(null, { list: listToTree(list, 'parentId', 'permissionId', 0), total: count });
            }
            //转为树形结构
            const list = listToTree(rows, 'parentId', 'permissionId', 0);
            return result.success(null, { list, total: count });
        } catch (error) {
            console.log(error);
            return result.failed(error);
        }
    }

    /**
     * 设置系统角色的权限
     * @param {*} data
     */
    async setSysRolePermission(data) {
        if (!data.roleId || !Array.isArray(data.list)) return result.paramsLack();
        const { list, roleId } = data;
        try {
            //插入多条记录
            let records = list.map((item) => {
                item.roleId = roleId;
                if (item.parentId == 0) delete item['parentId'];
                return item;
            });
            let ids = list.map(item => item.permissionId);
            console.log(`records`, records);
            //先清除
            await SysRolesAuthModel.destroy({ where: { roleId, permissionId: ids } });
            //然后再写入
            await SysRolesAuthModel.bulkCreate(records);
            return result.success();
        } catch (error) {
            console.log(error);
            return result.failed(error);
        }
    }

    /**
     * 清除角色的所有权限
     * @param {*} data
     */
    async clearSysRoleAllPermission({ roleId }) {
        if (!roleId) return result.paramsLack();
        try {
            //从中间表删除角色权限
            await SysRolesAuthModel.destroy({ where: { roleId } });
            return result.success();
        } catch (error) {
            console.log(error);
            return result.failed(error);
        }
    }

    /**
     * 获取角色的树形菜单
     * @param {*} param0
     */
    async getSysRoleMenusToTree({ roleId, isAdmin }) {
        if (!roleId) return result.paramsLack();
        const table = SysPermissionModel.getTableName();
        const includes = [`title`, `path`, `name`, `icon`, `sort`, `remark`, `parentId`];
        //查询中间表
        let queryData = {
            where: { roleId },
            include: [{
                where: { isDelete: false },
                model: SysPermissionModel,
                attributes: []
            }],
            order: [
                [COL(table, 'sort'), 'ASC']
            ],
            attributes: [`roleId`, `permissionId`, `find`, `add`, `edit`, `del`, `list`].concat(Attrs(table, includes)),
            raw: true
        };

        //超级管理员
        let queryAdmin = {
            where: { isDelete: false },
            order: [
                ['sort', 'ASC']
            ],
            attributes: ['permissionId', 'find', 'add', 'edit', 'del', 'list'].concat(includes)
        };

        try {
            if (isAdmin) { //超级管理员直接返回所有的权限
                let rows = await SysPermissionModel.findAll(queryAdmin);
                let arr = rows.map((item) => { //所有的权限
                    item.find = 1;
                    item.add = 1;
                    item.edit = 1;
                    item.del = 1;
                    item.list = 1;
                    return item;
                });
                //转为树形结构
                const list = listToTree(arr, 'parentId', 'permissionId', 0);
                return result.success(null, list);
            }
            //建立表关联
            SysRolesAuthModel.belongsTo(SysPermissionModel, { foreignKey: 'permissionId' });
            let rows = await SysRolesAuthModel.findAll(queryData);
            //转为树形结构
            const list = listToTree(rows, 'parentId', 'permissionId', 0);
            return result.success(null, list);
        } catch (error) {
            console.log(error);
            return result.failed(error);
        }
    }
};
