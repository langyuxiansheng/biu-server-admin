'use strict';

/**
 * 文件基础表数据模型
 * @param {*} sequelize
 * @param {*} dataTypes
 * 此模型仅限关系型数据库使用
 */
// const { getTimeStampUUID } = require(':lib/Utils');
module.exports = function (sequelize, dataTypes) {
    return sequelize.define('FilesBase', {

        //文件ID
        fileId: {
            type: dataTypes.STRING(50),
            allowNull: false,
            primaryKey: true
        },

        //文件名
        fileName: {
            type: dataTypes.STRING(100),
            allowNull: true
        },

        //文件别名
        aliasName: {
            type: dataTypes.STRING(100),
            allowNull: true
        },

        //上传人ID
        userId: {
            type: dataTypes.STRING(50),
            allowNull: true
        },

        //上传人名称
        userName: {
            type: dataTypes.STRING(100),
            allowNull: true
        },

        //文件大小
        size: {
            type: dataTypes.BIGINT(20),
            allowNull: true
        },

        //文件类型
        type: {
            type: dataTypes.STRING(100),
            allowNull: true
        },

        //文件后缀
        suffix: {
            type: dataTypes.STRING(30),
            allowNull: true
        },

        //文件存放的路径
        path: {
            type: dataTypes.STRING(200),
            allowNull: true
        },

        fileMD5: { //文件指纹
            type: dataTypes.STRING(40),
            allowNull: true
        },

        //文件状态
        status: {
            type: dataTypes.INTEGER(2),
            allowNull: true
        },

        //备注
        remark: {
            type: dataTypes.STRING(255),
            allowNull: true
        },

        //是否删除 true是 false否
        isDelete: {
            type: dataTypes.BOOLEAN(),
            allowNull: true,
            defaultValue: function defaultValue() {
                return false;
            }
        },

        //创建时间
        createdTime: {
            type: dataTypes.INTEGER(),
            allowNull: true,
            defaultValue: function defaultValue() {
                return Date.parse(new Date()) / 1000;
            }
        },

        //修改时间
        updatedTime: {
            type: dataTypes.INTEGER(),
            allowNull: true,
            defaultValue: function defaultValue() {
                return Date.parse(new Date()) / 1000;
            }
        }
    }, {
        tableName: 'biu_files_base'
    });
};