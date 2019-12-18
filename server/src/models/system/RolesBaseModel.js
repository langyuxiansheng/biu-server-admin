/**
 * 角色基础表数据模型
 * @param {*} sequelize
 * @param {*} dataTypes
 * 此模型仅限关系型数据库使用
 */
const { getTimeStampUUID } = require(':lib/Utils');
module.exports = (sequelize, dataTypes) => {
    return sequelize.define('sys_roles_base', {
        //角色ID
        roleId: {
            type: dataTypes.STRING(),
            allowNull: false,
            primaryKey: true,
            defaultValue: () => getTimeStampUUID()
        },

        //角色名称
        roleName: {
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
        tableName: 'sys_roles_base',
        timestamps: false //是否需要增加createdAt、updatedAt、deletedAt字段
    });
};
