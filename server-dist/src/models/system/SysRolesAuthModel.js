'use strict';

/**
 * 角色权限过渡中间表数据模型
 * @param {*} sequelize
 * @param {*} dataTypes
 * 此模型仅限关系型数据库使用
 */
module.exports = function (sequelize, dataTypes) {
    return sequelize.define('sys_roles_auth', {

        //过度中间表ID
        roleId: {
            type: dataTypes.STRING(),
            allowNull: false,
            primaryKey: true
        },

        //权限
        permissionId: {
            type: dataTypes.STRING(),
            allowNull: false,
            primaryKey: true
        },

        //权限父级ID
        parentId: {
            type: dataTypes.STRING(),
            allowNull: true
        },

        //查看权限
        find: {
            type: dataTypes.INTEGER(2),
            allowNull: true,
            defaultValue: 0
        },

        //添加权限
        add: {
            type: dataTypes.INTEGER(2),
            allowNull: true,
            defaultValue: 0
        },

        //编辑权限
        edit: {
            type: dataTypes.INTEGER(2),
            allowNull: true,
            defaultValue: 0
        },

        //删除权限
        del: {
            type: dataTypes.INTEGER(2),
            allowNull: true,
            defaultValue: 0
        },

        //列表权限
        list: {
            type: dataTypes.INTEGER(2),
            allowNull: true,
            defaultValue: 0
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
        tableName: 'sys_roles_auth',
        timestamps: false //是否需要增加createdAt、updatedAt、deletedAt字段
    });
};