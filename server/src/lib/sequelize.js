/**
 * Sequelize.js api说明文档
 * https: //itbilu.com/nodejs/npm/V1PExztfb.html
 */
const Sequelize = require('sequelize/index');
const config = require(':config/server.base.config'); //配置文件
const { systemLogger, sqlLog } = require(':lib/logger4');
const SOP = Sequelize.Op;
/**
 * 列关联
 * @param {*} table
 * @param {*} col
 */
const COL = (table, col) => {
    return Sequelize.col(`${table}.${col}`);
};

/**
 * attr合成
 * @param {*} table
 * @param {*} list
 */
const Attrs = (table, list) => {
    let arr = [];
    for (let x in list) {
        arr.push(COL(table, list[x]));
    }
    return arr;
};

const BiuDB = new Sequelize(config.dbs[0].database, config.dbs[0].username, config.dbs[0].password, {
    host: config.dbs[0].host, // 数据库地址
    dialect: config.dbs[0].DB_type, // 指定连接的数据库类型
    dialectOptions: config.dbs[0].dialectOptions, //mysql专用
    pool: config.dbs[0].pool, //连接池对象
    define: config.dbs[0].define, //连接池对象
    logging(sql) { //日志输出
        sqlLog.info(`mu_home_db----${sql}`);
    }
});

BiuDB.authenticate().then((res) => {
    systemLogger.info(`连接数据库：${config.dbs[0].database} 成功!`);
}).catch(err => {
    systemLogger.info(`连接数据库：${config.dbs[0].database} 出错!`, err);
});
//同步数据库模型专用 此操作将会删除数据库的表重新创建,请谨慎使用
// BiuDB.sync({ force: true }).then(function(result) {
//     console.log('result');
// });
//配置关系型数据库ORM
module.exports = { Sequelize, BiuDB, SOP, COL, Attrs, DataTypes: Sequelize.DataTypes };
