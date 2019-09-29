/**
 * Sequelize.js api说明文档
 * https: //itbilu.com/nodejs/npm/V1PExztfb.html
 */
const Sequelize = require('sequelize');
const config = {
    DB_type: 'mysql', // 数据库类型
    host: 'localhost', // 服务器地址
    port: 3306, // 数据库端口号
    username: 'root', // 数据库用户名
    password: '', // 数据库密码
    database: 'biu_server_db', // 数据库名称
    dialectOptions: { // MySQL > 5.5，其它数据库删除此项
        charset: 'utf8mb4',
        supportBigNumbers: true,
        bigNumberStrings: true
        //collate: 'utf8mb4_unicode_520_ci',
        //requestTimeout: 60 * 1000 //设置连接超时时间
    },
    define: {
        underscored: false, //	转换列名的驼峰命名规则为下划线命令规则
        freezeTableName: true, //设置为true时，sequelize不会改变表名，否则可能会按其规则有所调整
        charset: 'utf8mb4',
        timestamps: false //为模型添加 createdAt 和 updatedAt 两个时间戳字段
    },
    pool: {
        max: 50, // 连接池中最大连接数量
        min: 0, // 连接池中最小连接数量
        idle: 10000 // 如果一个线程 10 秒钟内没有被使用过的话，那么就释放线程
    }
};
const SOP = Sequelize.Op;
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

const MuHomeDB = new Sequelize(config.database, config.username, config.password, {
    host: config.host, // 数据库地址
    dialect: config.DB_type, // 指定连接的数据库类型
    dialectOptions: config.dialectOptions, //mysql专用
    pool: config.pool, //连接池对象
    define: config.define //连接池对象
    // operatorsAliases
});

MuHomeDB.authenticate().then((res) => {
    console.log(`连接数据库：${config.database} 成功!`);
}).catch(err => {
    throw new Error(`连接数据库：${config.database} 出错${err}`);
});

//同步数据库模型专用 此操作将会删除数据库的表重新创建,请谨慎使用
// MuHomeDB.sync({ force: true }).then(function(result) {
//     console.log('result');
// });

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

//配置关系型数据库ORM
module.exports = { Sequelize, MuHomeDB, SOP, COL, Attrs };
