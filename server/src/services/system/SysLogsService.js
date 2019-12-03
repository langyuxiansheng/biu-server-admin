/**
 * 系统日志管理
 */
const result = require(':lib/Result');
const { SRC_PATH } = require(':lib/Utils');
const { getLogsFileList } = require(':lib/FileUtils');
module.exports = class {
    /**
     * 获取系统日志列表
     * @param {*} param0
     */
    async getSysLogList({ isAdmin }) {
        //非超级管理员不可获取此数据
        if (!isAdmin) return result.noAuthority();
        try {
            //查询账号是否存在
            // const { rows, count } = await SysAdminBaseModel.findAndCountAll(queryData);
            // return result.success(null, { list: rows, total: count });
            const res = await getLogsFileList(SRC_PATH + '/logs');
            return result.success(null, { list: res });
        } catch (error) {
            console.log(error);
            return result.failed(error);
        }
    }

    // /**
    //  * 获取管理员的基础信息
    //  * @param {*} param0
    //  */
    // async getSysAdminBaseInfo({ adminId }) {
    //     if (!adminId) return result.paramsLack();
    //     let queryData = {
    //         where: { adminId, isDelete: false },
    //         attributes: { exclude: ['isDelete', 'createdTime', 'updatedTime', 'password'] }
    //     };
    //     try {
    //         const info = await SysAdminBaseModel.findOne(queryData);
    //         return result.success(null, info);
    //     } catch (error) {
    //         console.log(error);
    //         return result.failed(error);
    //     }
    // }

    /**
     * 删除系统日志
     * @param {*} param0
     */
    async delSysLogByPaths({ paths, isDelete }, { isAdmin }) {
        //非超级管理员不可获取此菜单
        if (!isAdmin) return result.noAuthority();
        if (!paths || !isDelete || !Array.isArray(paths)) return result.paramsLack();
        try {
            //批量软删除
            // const del = { where: { adminId: ids } };
            return result.success();
        } catch (error) {
            console.log(error);
            return result.failed(error);
        }
    }
};
