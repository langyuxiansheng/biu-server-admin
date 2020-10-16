/**
 * 角色权限表数据模型
 * @param {*} sequelize
 * @param {*} dataTypes
 * 此模型仅限关系型数据库使用
 */
const { getTimeStampUUID } = require(':lib/Utils');
module.exports = (sequelize, dataTypes) => {
    return sequelize.define('sys_permission', {

        //权限ID
        permissionId: {
            type: dataTypes.STRING(),
            allowNull: false,
            primaryKey: true,
            defaultValue: () => getTimeStampUUID()
        },

        //权限父级ID
        parentId: {
            type: dataTypes.STRING(),
            allowNull: true,
            defaultValue: 0
        },

        //菜单名
        title: {
            type: dataTypes.STRING(),
            allowNull: true
        },

        //菜单类型 1菜单,2按钮
        type: {
            type: dataTypes.STRING(10),
            allowNull: true,
            defaultValue: () => 1
        },

        //菜单路径
        path: {
            type: dataTypes.STRING(),
            allowNull: true
        },

        //组件name
        name: {
            type: dataTypes.STRING(),
            allowNull: true
        },

        //组件名称
        component: {
            type: dataTypes.STRING(),
            allowNull: true
        },

        //菜单图标
        icon: {
            type: dataTypes.STRING(),
            allowNull: true
        },

        // //查看权限
        // find: {
        //     type: dataTypes.INTEGER(2),
        //     allowNull: true,
        //     defaultValue: 0
        // },

        // //添加权限
        // add: {
        //     type: dataTypes.INTEGER(2),
        //     allowNull: true,
        //     defaultValue: 0
        // },

        // //编辑权限
        // edit: {
        //     type: dataTypes.INTEGER(2),
        //     allowNull: true,
        //     defaultValue: 0
        // },

        // //删除权限
        // del: {
        //     type: dataTypes.INTEGER(2),
        //     allowNull: true,
        //     defaultValue: 0
        // },

        // //列表权限
        // list: {
        //     type: dataTypes.INTEGER(2),
        //     allowNull: true,
        //     defaultValue: 0
        // },

        //排序
        sort: {
            type: dataTypes.INTEGER(),
            allowNull: true
        },

        //备注
        remark: {
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
        tableName: 'sys_permission',
        timestamps: false //是否需要增加createdAt、updatedAt、deletedAt字段
    });
};
