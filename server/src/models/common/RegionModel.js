/**
 * 地址基础表数据模型
 * @param {*} sequelize
 * @param {*} dataTypes
 * 此模型仅限关系型数据库使用
 */
const { getTimeStampUUID } = require(':lib/Utils');
module.exports = (sequelize, dataTypes) => {
    return sequelize.define('Region', {

        //地址ID
        regionId: {
            type: dataTypes.STRING(50),
            allowNull: false,
            primaryKey: true,
            defaultValue: () => getTimeStampUUID()
        },

        //名称
        name: {
            type: dataTypes.STRING(50),
            allowNull: true
        },

        //父级ID
        pid: {
            type: dataTypes.STRING(50),
            allowNull: true
        },

        //简称
        sname: {
            type: dataTypes.STRING(40),
            allowNull: true
        },

        //级别
        level: {
            type: dataTypes.STRING(10),
            allowNull: true
        },

        //地址代码
        citycode: {
            type: dataTypes.STRING(20),
            allowNull: true
        },

        //邮政编码
        yzcode: {
            type: dataTypes.STRING(20),
            allowNull: true
        },

        //全称
        mername: {
            type: dataTypes.STRING(100),
            allowNull: true
        },

        //经度
        lng: {
            type: dataTypes.FLOAT(),
            allowNull: true
        },

        //纬度
        lat: {
            type: dataTypes.FLOAT(),
            allowNull: true
        },

        //拼音
        pinyin: {
            type: dataTypes.STRING(100),
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
        tableName: 'mu_region'
    });
};
