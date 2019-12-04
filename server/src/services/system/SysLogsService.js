/**
 * 系统日志管理
 */
const path = require('path');
const result = require(':lib/Result');
const { SRC_PATH } = require(':lib/Utils');
const { getLogsFileList, readerFile } = require(':lib/FileUtils');
module.exports = class {
    /**
     * 获取系统日志列表
     * @param {*} param0
     */
    async getSysLogList({ isAdmin }) {
        //非超级管理员不可获取此数据
        if (!isAdmin) return result.noAuthority();
        try {
            const res = await getLogsFileList(path.join(SRC_PATH, '/logs'));
            return result.success(null, { list: res });
        } catch (error) {
            console.log(error);
            return result.failed(error);
        }
    }

    /**
     * 获取系统日志内容
     * @param {*} param0
     * @param {*} param1
     */
    async getSysLogContent({ logPath }, { isAdmin }) {
        //非超级管理员不可获取此数据
        if (!isAdmin) return result.noAuthority();
        try {
            const { code, data } = await readerFile(path.join(SRC_PATH, logPath), 'utf-8');
            if (code == 200) {
                return result.success(null, data);
            }
            return result.failed('读取日志失败!');
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
