/**
 * 用户登录
 */
const result = require(':lib/Result');
const { MODELS_PATH } = require(':lib/Utils');
const { SOP, MuHomeDB } = require(':lib/sequelize');
const SysRolesBaseModel = MuHomeDB.import(`${MODELS_PATH}/system/SysRolesBaseModel`);
module.exports = class {
    /**
     * 添加系统角色
     * @param {*} param0
     */
    async addSysRole({ roleName }) {
        if (!roleName) return result.paramsLack();
        try {
            //查询角色是否存在
            const count = await SysRolesBaseModel.count({
                where: { roleName, isDelete: false }
            });
            if (count > 0) return result.failed('角色已存在!');
            const save = { roleName }; //保存数据
            await SysRolesBaseModel.create(save);
            return result.success();
        } catch (error) {
            console.log(error);
            return result.failed(error);
        }
    }

    /**
     * 获取系统角色列表
     * @param {*} param0
     */
    async getSysRoleList({ roleName, page, limit }) {
        let queryData = {
            where: { isDelete: false },
            order: [
                ['createdTime', 'DESC']
            ],
            attributes: { exclude: ['isDelete'] }
        };
        if (roleName) {
            queryData.where['roleName'] = {
                [SOP.like]: `%${roleName}%`
            };
        }
        //分页
        if (page && limit) {
            queryData.offset = Number((page - 1) * limit); //开始的数据索引
            queryData.limit = Number(limit); //每页限制返回的数据条数
        };
        try {
            const { rows, count } = await SysRolesBaseModel.findAndCountAll(queryData);
            return result.success(null, { list: rows, total: count });
        } catch (error) {
            console.log(error);
            return result.failed(error);
        }
    }

    /**
     * 删除系统角色
     * @param {*} param0
     */
    async delSysRoleByIds({ ids, isDelete }) {
        if (!ids || !isDelete || !Array.isArray(ids)) return result.paramsLack();
        try {
            //批量软删除
            const del = { where: { roleId: ids } };
            await SysRolesBaseModel.update({ isDelete }, del);
            return result.success();
        } catch (error) {
            console.log(error);
            return result.failed(error);
        }
    }

    /**
     * 编辑系统角色
     * @param {*} data
     */
    async updateSysRole(data) {
        if (!data.roleId) return result.paramsLack();
        try {
            await SysRolesBaseModel.update(data, { where: { roleId: data.roleId } });
            return result.success();
        } catch (error) {
            console.log(error);
            return result.failed(error);
        }
    }
};
