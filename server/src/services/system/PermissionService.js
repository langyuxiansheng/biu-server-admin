/**
 * 权限管理
 */
const result = require(':lib/Result');
const { MODELS_PATH, listToTree } = require(':lib/Utils');
const { Attrs, SOP, BiuDB, COL } = require(':lib/sequelize');
const PermissionModel = BiuDB.import(`${MODELS_PATH}/system/PermissionModel`);
const RolesAuthModel = BiuDB.import(`${MODELS_PATH}/system/RolesAuthModel`);
module.exports = class {
    constructor() {
        PermissionModel.sync().then((res) => {
            console.log(`PermissionModel 同步成功`, res);
        });
        RolesAuthModel.sync().then((res) => {
            console.log(`RolesAuthModel 同步成功`, res);
        });
    }

    /**
     * 添加系统权限
     * @param {*} user
     */
    async addSysPermission(data, { isAdmin }) {
        //非超级管理员不可获取此菜单
        if (!isAdmin) return result.noAuthority();
        const { title, type, path, name, parentId } = data;
        if (type == 1 && (!title || !path || !name)) {
            return result.paramsLack();
        } else if (type == 2 && (!title || !name)) {
            return result.paramsLack();
        }

        try {
            let queryData = {
                where: { title, path, isDelete: false }
            };
            if (type == 2) {
                queryData.where.parentId = parentId;
            }
            //查询是否存在
            const count = await PermissionModel.count(queryData);
            if (count > 0) return result.failed('权限已存在!');
            await PermissionModel.create(data); //保存数据
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
    async getSysPermissionList({ title, page, limit }, { isAdmin }) {
        //非超级管理员不可获取此菜单
        if (!isAdmin) return result.noAuthority();
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
            const { rows, count } = await PermissionModel.findAndCountAll(queryData);
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
    async delSysPermissionByIds({ ids, isDelete }, { isAdmin }) {
        //非超级管理员不可获取此菜单
        if (!isAdmin) return result.noAuthority();
        if (!ids || !isDelete || !Array.isArray(ids)) return result.paramsLack();
        try {
            //批量软删除
            const del = {
                where: {
                    [SOP.or]: [{ permissionId: ids }, { parentId: ids }]
                }
            };
            await PermissionModel.update({ isDelete }, del);
            //从中间表删除对应的权限
            RolesAuthModel.destroy({
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
    async updateSysPermission(data, { isAdmin }) {
        //非超级管理员不可获取此菜单
        if (!isAdmin) return result.noAuthority();
        if (!data.permissionId) return result.paramsLack();
        try {
            await PermissionModel.update(data, { where: { permissionId: data.permissionId } });
            return result.success();
        } catch (error) {
            console.log(error);
            return result.failed(error);
        }
    }

    /**
     * 获取树状权限列表
     * @param {*} param0
     */
    async getSysPermissionListToTree({ title, page, limit }, { isAdmin }) {
        //非超级管理员不可获取此菜单
        if (!isAdmin) return result.noAuthority();
        let queryData = {
            where: { isDelete: false },
            order: [
                // ['createdTime', 'DESC'],
                ['sort', 'ASC']
            ],
            attributes: ['permissionId', 'parentId', 'title', 'path', 'type']
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
            let { rows, count } = await PermissionModel.findAndCountAll(queryData);
            const list = listToTree(rows, 'parentId', 'permissionId', 0);
            return result.success(null, { list, total: count });
        } catch (error) {
            console.log(error);
            return result.failed(error);
        }
    }

    /**
     * 获取角色的权限(权限设置)
     * @param {*} param0
     */
    async getSysRolePermissionListToTree({ roleId }) {
        if (!roleId) return result.paramsLack();
        try {
            let rows = await PermissionModel.findAll({
                where: { isDelete: false },
                order: [['sort', 'ASC']],
                attributes: ['permissionId', 'parentId', 'title', 'path', 'type']
            });
            //查询中间表
            const checkeds = await RolesAuthModel.findAll({
                where: { roleId },
                attributes: { exclude: ['createdTime', 'updatedTime'] }
            });
            //转为树形结构
            const list = listToTree(rows, 'parentId', 'permissionId', 0);
            return result.success(null, { list, checkeds });
        } catch (error) {
            console.log(error);
            return result.failed(error);
        }
    }

    /**
     * 设置系统角色的权限
     * @param {*} data
     */
    async setSysRolePermission(data, { isAdmin }) {
        //非超级管理员不可获取此菜单
        if (!isAdmin) return result.noAuthority();
        if (!data.roleId || !Array.isArray(data.list)) return result.paramsLack();
        const { list, roleId } = data;
        try {
            //插入多条记录
            let records = list.map((item) => {
                item.roleId = roleId;
                if (item.parentId == 0) delete item['parentId'];
                return item;
            });
            //先清除
            await RolesAuthModel.destroy({ where: { roleId } });
            //然后再写入
            await RolesAuthModel.bulkCreate(records);
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
    async clearSysRoleAllPermission({ roleId }, { isAdmin }) {
        //非超级管理员不可获取此菜单
        if (!isAdmin) return result.noAuthority();
        if (!roleId) return result.paramsLack();
        try {
            //从中间表删除角色权限
            await RolesAuthModel.destroy({ where: { roleId } });
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
        const table = PermissionModel.getTableName();
        const includes = [`title`, 'type', `path`, `name`, `icon`, `sort`, `remark`, `parentId`];
        try {
            if (isAdmin) { //超级管理员直接返回所有的权限
                let rows = await PermissionModel.findAll({
                    where: { isDelete: false },
                    order: [
                        ['sort', 'ASC']
                    ],
                    attributes: ['permissionId'].concat(includes)
                });
                //转为树形结构
                const list = listToTree(rows, 'parentId', 'permissionId', 0);
                return result.success(null, list);
            }
            //建立表关联
            RolesAuthModel.belongsTo(PermissionModel, { foreignKey: 'permissionId' });
            //查询中间表
            let rows = await RolesAuthModel.findAll({
                where: { roleId },
                include: [{
                    where: { isDelete: false },
                    model: PermissionModel,
                    attributes: []
                }],
                order: [
                    [COL(table, 'sort'), 'ASC']
                ],
                attributes: [`roleId`, `permissionId`].concat(Attrs(table, includes)),
                raw: true
            });
            //转为树形结构
            const list = listToTree(rows, 'parentId', 'permissionId', 0);
            return result.success(null, list);
        } catch (error) {
            console.log(error);
            return result.failed(error);
        }
    }
};
