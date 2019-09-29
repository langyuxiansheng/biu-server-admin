/**
 * 用户登录
 */
const result = require(':lib/Result');
const { MODELS_PATH } = require(':lib/Utils');
const { SOP, MuHomeDB } = require(':lib/sequelize');
const SysAdminBaseModel = MuHomeDB.import(`${MODELS_PATH}/system/SysAdminBaseModel`);
// MuHomeDB.import(`${MODELS_PATH}/system/SysPermissionModel`);
// MuHomeDB.import(`${MODELS_PATH}/system/SysRolesAuthModel`);
// MuHomeDB.import(`${MODELS_PATH}/system/SysRolesBaseModel`);
module.exports = class {
    /**
     * 添加管理平台
     * @param {*} param0
     */
    async addSysAdmin({ adminName, account, password, avatar }) {
        if (!account || !password) return result.paramsLack();
        try {
            //查询账号是否存在
            const count = await SysAdminBaseModel.count({
                where: { account, isDelete: false }
            });
            if (count > 0) return result.failed('用户已存在!');
            const save = { adminName, account, password, avatar }; //保存数据
            await SysAdminBaseModel.create(save);
            return result.success();
        } catch (error) {
            console.log(error);
            return result.failed(error);
        }
    }

    /**
     * 获取系统管理员列表
     * @param {*} param0
     */
    async getSysAdminList({ account, page, limit }) {
        let queryData = {
            where: { isDelete: false },
            order: [
                ['createdTime', 'DESC']
            ],
            attributes: { exclude: ['isDelete'] }
        };
        if (account) {
            queryData.where['account'] = {
                [SOP.like]: `%${account}%`
            };
        }
        //分页
        if (page && limit) {
            queryData.offset = Number((page - 1) * limit); //开始的数据索引
            queryData.limit = Number(limit); //每页限制返回的数据条数
        };
        try {
            //查询账号是否存在
            const { rows, count } = await SysAdminBaseModel.findAndCountAll(queryData);
            return result.success(null, { list: rows, total: count });
        } catch (error) {
            console.log(error);
            return result.failed(error);
        }
    }

    /**
     * 删除系统管理员
     * @param {*} param0
     */
    async delSysAdminByIds({ ids, isDelete }) {
        if (!ids || !isDelete || !Array.isArray(ids)) return result.paramsLack();
        try {
            //批量软删除
            const del = { where: { adminId: ids } };
            await SysAdminBaseModel.update({ isDelete }, del);
            return result.success();
        } catch (error) {
            console.log(error);
            return result.failed(error);
        }
    }

    /**
     * 编辑系统管理员
     * @param {*} data
     */
    async updateSysAdmin(data) {
        if (!data.adminId) return result.paramsLack();
        try {
            await SysAdminBaseModel.update(data, { where: { adminId: data.adminId } });
            return result.success();
        } catch (error) {
            console.log(error);
            return result.failed(error);
        }
    }

    /**
     * 绑定管理员的角色
     * @param {*} data
     */
    async bindSysAdminRole({ adminId, roleId, roleName }) {
        if (!adminId || !roleId || !roleName) return result.paramsLack();
        try {
            const bindData = { roleId, roleName };
            await SysAdminBaseModel.update(bindData, { where: { adminId } });
            return result.success();
        } catch (error) {
            console.log(error);
            return result.failed(error);
        }
    }

    /**
     * 获取管理员的基础信息
     * @param {*} param0
     */
    async getSysAdminBaseInfo({ adminId }) {
        if (!adminId) return result.paramsLack();
        let queryData = {
            where: { adminId, isDelete: false },
            attributes: { exclude: ['isDelete', 'createdTime', 'updatedTime', 'password'] }
        };
        try {
            const info = await SysAdminBaseModel.findOne(queryData);
            return result.success(null, info);
        } catch (error) {
            console.log(error);
            return result.failed(error);
        }
    }

    /**
     * 修改系统管理的密码
     * @param {*} data
     */
    async updateSysPassword({ data, user }) {
        const { adminId, account } = user && user.data;
        const { password, newPassword } = data;
        if (!adminId || !account || !password || !newPassword) return result.paramsLack();
        let queryData = {
            where: { adminId, account, isDelete: false },
            attributes: { exclude: ['isDelete', 'createdTime', 'updatedTime'] }
        };
        try {
            const info = await SysAdminBaseModel.findOne(queryData);
            if (!info) return result.failed(`用户不存在!`);
            if (password !== info.password) return result.failed(`密码错误!`);
            const res = await SysAdminBaseModel.update({ password: newPassword }, { where: { adminId, account } });
            return result.success(null, res);
        } catch (error) {
            console.log(error);
            return result.failed(error);
        }
    }
};
