/**
 * 系统日志管理
 */
const path = require('path');
const result = require(':lib/Result');
const { SRC_PATH } = require(':lib/Utils');
const { getLogsFileList, readerFile, writeFile } = require(':lib/FileUtils');
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

    /**
     * 删除系统日志内容
     * @param {*} param0
     * @description 只能清空内容不能直接删除文件,否则没释放资源的情况下会报错
     */
    async delSysLogByPaths({ paths, isDelete }, { isAdmin }) {
        //非超级管理员不可获取此菜单
        if (!isAdmin) return result.noAuthority();
        if (!paths || !isDelete || !Array.isArray(paths)) return result.paramsLack();
        try {
            const deleteFiles = paths.map((logPath) => { //批量删除
                return new Promise(async (resolve, reject) => {
                    try {
                        const res = await writeFile(path.join(SRC_PATH, logPath), ''); //上传成功后删除临时文件
                        if (res && res.code == 200) {
                            resolve(logPath);
                        } else {
                            reject(res);
                        }
                    } catch (error) {
                        reject(error);
                    }
                });
            });
            //返回删除文件的结果
            const delData = await Promise.all(deleteFiles);
            return result.success(null, { list: delData });
        } catch (error) {
            console.log(error);
            return result.failed(error);
        }
    }
};
