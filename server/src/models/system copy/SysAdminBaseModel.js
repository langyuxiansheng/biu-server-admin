/**
 * 平台管理员基础表数据模型
 * @param {*} sequelize
 * @param {*} dataTypes
 * 此模型仅限关系型数据库使用
 */
const Utils = require(':lib/Utils');
module.exports = (sequelize, dataTypes) => {
    return sequelize.define('sys_admin_base', {

        //管理员ID
        adminId: {
            type: dataTypes.STRING(),
            allowNull: false,
            primaryKey: true,
            defaultValue: () => Utils.getTimeStampUUID()
        },

        //管理员名称
        adminName: {
            type: dataTypes.STRING(),
            allowNull: false
        },

        //管理员账号
        account: {
            type: dataTypes.STRING(),
            allowNull: false
        },

        //管理员密码
        password: {
            type: dataTypes.STRING(),
            allowNull: false
        },

        //账号状态是否禁用 true禁用 false没有禁用
        status: {
            type: dataTypes.INTEGER(2),
            allowNull: true
        },

        //是否超级管理员 true是 false普通管理员
        isAdmin: {
            type: dataTypes.BOOLEAN(),
            allowNull: true
        },

        //头像路径
        avatar: {
            type: dataTypes.STRING(),
            allowNull: true
        },

        //角色名称
        roleName: {
            type: dataTypes.STRING(),
            allowNull: true
        },

        //角色ID
        roleId: {
            type: dataTypes.STRING(),
            allowNull: true
        },

        //是否删除 true是 false否
        isDelete: {
            type: dataTypes.BOOLEAN(),
            allowNull: true,
            defaultValue: () => false
        },

        //创建时间
        createdTime: {
            type: dataTypes.INTEGER(),
            allowNull: true,
            defaultValue: () => (Date.parse(new Date()) / 1000)
        },

        //修改时间
        updatedTime: {
            type: dataTypes.INTEGER(),
            allowNull: true,
            defaultValue: () => (Date.parse(new Date()) / 1000)
        }
    }, {
        freezeTableName: true,
        tableName: 'sys_admin_base',
        timestamps: false //是否需要增加createdAt、updatedAt、deletedAt字段
    });
};
