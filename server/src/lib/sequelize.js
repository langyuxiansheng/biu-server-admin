/**
 * Sequelize.js api说明文档
 * https: //itbilu.com/nodejs/npm/V1PExztfb.html
 */
const Sequelize = require('sequelize');
const config = require(':config/server.base.config'); //配置文件
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
//继续使用所有默认别名
// const Op = Sequelize.Op;
// const operatorsAliases = {
//     $eq: Op.eq,
//     $ne: Op.ne,
//     $gte: Op.gte,
//     $gt: Op.gt,
//     $lte: Op.lte,
//     $lt: Op.lt,
//     $not: Op.not,
//     $in: Op.in,
//     $notIn: Op.notIn,
//     $is: Op.is,
//     $like: Op.like,
//     $notLike: Op.notLike,
//     $iLike: Op.iLike,
//     $notILike: Op.notILike,
//     $regexp: Op.regexp,
//     $notRegexp: Op.notRegexp,
//     $iRegexp: Op.iRegexp,
//     $notIRegexp: Op.notIRegexp,
//     $between: Op.between,
//     $notBetween: Op.notBetween,
//     $overlap: Op.overlap,
//     $contains: Op.contains,
//     $contained: Op.contained,
//     $adjacent: Op.adjacent,
//     $strictLeft: Op.strictLeft,
//     $strictRight: Op.strictRight,
//     $noExtendRight: Op.noExtendRight,
//     $noExtendLeft: Op.noExtendLeft,
//     $and: Op.and,
//     $or: Op.or,
//     $any: Op.any,
//     $all: Op.all,
//     $values: Op.values,
//     $col: Op.col
// };

const BiuDB = new Sequelize(config.dbs[0].database, config.dbs[0].username, config.dbs[0].password, {
    host: config.dbs[0].host, // 数据库地址
    dialect: config.dbs[0].DB_type, // 指定连接的数据库类型
    dialectOptions: config.dbs[0].dialectOptions, //mysql专用
    pool: config.dbs[0].pool, //连接池对象
    define: config.dbs[0].define //连接池对象
    // operatorsAliases
});

BiuDB.authenticate().then((res) => {
    console.log(`连接数据库：${config.dbs[0].database} 成功!`);
}).catch(err => {
    throw new Error(`连接数据库：${config.dbs[0].database} 出错${err}`);
});

//同步数据库模型专用 此操作将会删除数据库的表重新创建,请谨慎使用
// BiuDB.sync({ force: true }).then(function(result) {
//     console.log('result');
// });

//配置关系型数据库ORM
module.exports = { Sequelize, BiuDB, SOP, COL, Attrs };
