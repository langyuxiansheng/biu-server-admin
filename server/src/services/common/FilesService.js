/**
 * 文件服务类
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const result = require(':lib/Result');
const config = require(':config/server.base.config'); //配置文件
const { MODELS_PATH, SRC_PATH, getExtname, getTimeStampUUID, getYearMonthDay, getFileNameUUID32 } = require(':lib/Utils');
const { isDirExists, deleteFile, readerFile } = require(':lib/FileUtils');
const { BiuDB, SOP } = require(':lib/sequelize');
const Email = require(':lib/Email');
const FilesBaseModel = BiuDB.import(`${MODELS_PATH}/common/FilesBaseModel`);
module.exports = class {
    constructor() {
        console.log(Email);
        FilesBaseModel.sync().then((res) => {
            console.log(`FilesBaseModel 同步成功`, res);
        });
    }

    /**
     * 单文件上传
     * @param {*} param0
     */
    async uploadFile({ state, files }) {
        const file = files.file; //文件
        if (!file) return result.failed(`未发现上传文件!`);
        try {
            if (Array.isArray(file)) { //只能上传单文件,需要删除临时文件
                file.forEach((file) => {
                    deleteFile(file.path); //上传成功后删除临时文件
                });
                return result.failed(`只能上传单文件!`);
            } else if (file.size / 1024 / 1024 > 200) { //单位是M
                return result.failed(`上传文件不能超过200M!`);
            }
            //创建文件夹
            const time = getYearMonthDay(); //获取时间
            let uploadPath = path.join(config.staticPath, `/uploads/`, time.replace(/-/g, '')); //文件上传存放路径
            const existsSync = await isDirExists(uploadPath, true); //判断文件夹是否存在,不存在就创建
            if (existsSync) { //确认成功之后再进行操作
                const data = await this.__filePromise(file, uploadPath, state.user.data); //调用文件上传方法
                await FilesBaseModel.create(data); //保存文件到数据库
                return result.success(null, data);
            }
            return result.failed(`上传文件异常!`);
        } catch (error) {
            console.log(error);
            return result.failed(error);
        }
    }

    /**
     * 多文件上传
     * @param {*} param0
     */
    async uploadFiles({ state, files }) {
        if (!files.file) return result.failed(`未发现上传文件!`);
        //兼容单文件上传
        const fileList = Array.isArray(files.file) ? files.file : [files.file];
        try {
            const maxSize = fileList.map(item => item.size).reduce((a, b) => (a + b), 0);
            if (maxSize / 1024 / 1024 < 200) { //单位是M
                fileList.forEach((file) => {
                    deleteFile(file.path); //上传成功后删除临时文件
                });
                return result.failed(`批量上传文件总大小不能超过200M!`);
            }

            //创建文件夹
            const time = getYearMonthDay(); //获取时间
            let uploadPath = path.join(config.staticPath, `/uploads/`, time.replace(/-/g, '')); //文件上传存放路径
            const existsSync = await isDirExists(uploadPath, true); //判断文件夹是否存在,不存在就创建
            if (existsSync) { //确认成功之后再进行操作
                //多文件上传
                const saveFiles = await Promise.all(fileList.map((file) => {
                    return this.__filePromise(file, uploadPath, state.user.data);
                }));
                //保存文件到数据库
                await FilesBaseModel.bulkCreate(saveFiles);
                console.log(saveFiles);
                return result.success(null, saveFiles);
            }
            return result.failed(`上传文件异常!`);
        } catch (error) {
            console.log(error);
            return result.failed(`上传文件出错!`);
        }
    }

    /**
     * 异步上传文件
     * @param {*} file
     */
    __filePromise (file, uploadPath, { userId, userName }) {
        return new Promise((resolve, reject) => { //异常上传,同步获取
            const md5sum = crypto.createHash('md5'); //创建文件指纹读取对象
            const { name, size, type } = file;
            //创建数据库存储数据
            const data = {
                userId, //上传者id
                userName, //上传者名称
                fileId: getTimeStampUUID(),
                size, //文件大小
                type, //文件类型
                fileName: name, //获取原文件名
                suffix: getExtname(name), //获取文件后缀名
                path: null, //文件路径
                aliasName: null, //文件别名
                remark: null //源文件路径
            };
            try {
                console.log(`正在上传${name}`);
                const reader = fs.createReadStream(file.path); //创建可读文件流
                const fileName = getFileNameUUID32(data.suffix); //重名名后的文件
                const fileSavePath = path.join(uploadPath, fileName); //合成路径 + 时间 + 文件名
                data.path = fileSavePath.split('public')[1]; //存储完整路径
                data.aliasName = fileName; //存储别名
                reader.pipe(fs.createWriteStream(fileSavePath)); //写入文件
                reader.on('data', (chunk) => { md5sum.update(chunk); }); //读取文件流
                reader.on('end', () => {
                    data.fileMD5 = md5sum.digest('hex').toUpperCase();
                    console.log(`fileMD5:`, data.fileMD5);
                    reader.close(); //关闭文件
                    deleteFile(file.path); //上传成功后删除临时文件
                    console.log(`文件:${name} 上传成功!`);
                    resolve(data);
                });
                reader.on('error', (err) => { reject(err); });
            } catch (error) {
                console.log(error);
                reject(error);
            }
        });
    }

    /**
     * 批量删除文件
     * @param {*} param0
     */
    async deleteFiles({ state, body: { ids } }) {
        if (!Array.isArray(ids)) return result.paramsLack();
        try {
            const { userId, isAdmin, roleName } = state.user.data;
            const queryData = {
                where: {
                    userId,
                    fileId: { [SOP.in]: ids },
                    isDelete: false
                }
            };
            if (isAdmin && (roleName === '超级管理员')) { //超级管理员会获取所有的文件
                delete queryData.where['userId'];
                delete queryData.where['isDelete'];
            }
            //查询相关文件
            const files = await FilesBaseModel.findAll(queryData);
            if (files && files.length) { //获取数据库里的文件数据
                if (isAdmin && (roleName === '超级管理员')) { //只有超级管理员才能真正的删除文件,普通用户为软删除
                    const deleteFiles = files.map((file) => {
                        return new Promise(async (resolve, reject) => {
                            try {
                                const res = await deleteFile(path.join(config.staticPath, file.path)); //上传成功后删除临时文件
                                if (res && res.code == 200) {
                                    await FilesBaseModel.destroy({ where: { fileId: file.fileId } });
                                    resolve(file);
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
                    //批量删除数据库的数据
                    return result.success(null, delData);
                } else {
                    //批量软删除
                    await FilesBaseModel.update({ isDelete: true }, { where: { fileId: ids } });
                    return result.success(null);
                }
            }
            return result.success(`未发现需要删除的文件!`);
        } catch (error) {
            console.log(error);
            return result.failed(`删除部分文件出错!`);
        }
    }

    /**
     * 获取文件列表
     * @param {*} param0
     */
    async getFiles({ state, query }) {
        const { userId, isAdmin, roleName } = state.user.data;
        const { keyword, isDelete, page, limit } = query;
        let queryData = {
            where: { userId, isDelete: false },
            order: [
                ['createdTime', 'DESC']
            ]
            // attributes: { exclude: ['isDelete'] }
        };
        if (isAdmin && (roleName === '超级管理员')) {
            delete queryData.where['userId']; //超级管理员会获取所有的文件
            delete queryData.where['isDelete'];
        }
        if (keyword) {
            queryData.where['fileName'] = {
                [SOP.like]: `%${keyword}%`
            };
        }

        if (isDelete != undefined || isDelete != null) {
            console.log(isDelete);
            queryData.where['isDelete'] = isDelete != 0;
        }

        if (page && limit) { //分页
            queryData.offset = Number((page - 1) * limit); //开始的数据索引
            queryData.limit = Number(limit); //每页限制返回的数据条数
        };

        try {
            const { rows, count } = await FilesBaseModel.findAndCountAll(queryData);
            return result.success(null, { list: rows, total: count });
        } catch (error) {
            console.log(error);
            return result.failed(error);
        }
    }

    /**
     * 获取文件详情
     * @param {*} param0
     */
    async getFileById({ fileId }) {
        if (!fileId) return result.paramsLack();
        try {
            const file = await FilesBaseModel.findOne({
                where: { fileId, isDelete: false },
                attributes: ['fileId', 'path', 'fileName']
            });
            return result.success(null, file);
        } catch (error) {
            console.log(error);
            return result.failed(error);
        }
    }

    /**
     * 读取文件内容
     * @param {*} param0
     */
    async readeFileContent({ filePath }) {
        if (!filePath) return result.paramsLack();
        try {
            const { code, data } = await readerFile(path.join(SRC_PATH, '/public', filePath), 'utf-8');
            if (code == 200) {
                return result.success(null, data);
            }
            return result.failed('读取文件失败!'); // return result.success(null, file);
        } catch (error) {
            console.log(error);
            return result.failed(error);
        }
    }
};
