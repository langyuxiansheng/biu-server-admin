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

//多数据源 这样是没有任何提示了,可以在正式环境这样使用;
// const dbs = Object();
// Object.keys(config.dbs).forEach((key, index) => {
//     const type = config.dbs[key].type;
//     const db = config.dbs[key].config;
//     if (type === 'sequelize') {
//         dbs[key] = new Sequelize(db.database, db.username, db.password, {
//             ...db.options,
//             logging(sql) { //日志输出 不显示的输出设置为false
//                 sqlLog.info(`${config.dbs[key].database}----${sql}`);
//             }
//         });
//         dbs[key].authenticate().then((res) => {
//             systemLogger.info(`连接数据库：${db.database} 成功!`);
//         }).catch(err => {
//             systemLogger.info(`连接数据库：${db.database} 出错!`, err);
//         });

//         //同步数据库模型专用 此操作将会删除数据库的表重新创建,请谨慎使用
//         // dbs[key].sync({ force: true }).then(function(result) {
//         //     console.log('result');
//         // });
//     }
// });

const BiuDB = new Sequelize(config.dbs.BiuDB.config.database, config.dbs.BiuDB.config.username, config.dbs.BiuDB.config.password, {
    ...config.dbs.BiuDB.config.options,
    logging(sql) { //日志输出 不显示的输出设置为false
        sqlLog.info(`${config.dbs.BiuDB.config.database}----${sql}`);
    }
});
BiuDB.authenticate().then((res) => {
    systemLogger.info(`连接数据库：${config.dbs.BiuDB.config.database} 成功!`);
}).catch(err => {
    systemLogger.info(`连接数据库：${config.dbs.BiuDB.config.database} 出错!`, err);
});

//同步数据库模型专用 此操作将会删除数据库的表重新创建,请谨慎使用
// BiuDB.sync({ force: true }).then(function(result) {
//     console.log('result');
// });

//配置关系型数据库ORM
module.exports = {
    Sequelize,
    SOP,
    COL,
    Attrs,
    DataTypes: Sequelize.DataTypes,
    BiuDB
};

/**
 *
const init = () => { //多数据源
    const options = {
        Sequelize,
        SOP,
        COL,
        Attrs,
        DataTypes: Sequelize.DataTypes
    };
    Object.keys(config.dbs).forEach((key) => {
        const type = config.dbs[key].type;
        const db = config.dbs[key].config;
        if (type === 'sequelize') {
            options['BiuDB'] = new Sequelize(db.database, db.username, db.password, {
                ...db.options,
                logging(sql) { //日志输出 不显示的输出设置为false
                    sqlLog.info(`${db.database}----${sql}`);
                }
            });
            options[key].authenticate().then((res) => {
                systemLogger.info(`连接数据库：${db.database} 成功!`);
            }).catch(err => {
                systemLogger.info(`连接数据库：${db.database} 出错!`, err);
            });

        //同步数据库模型专用 此操作将会删除数据库的表重新创建,请谨慎使用
        // dbs[key].sync({ force: true }).then(function(result) {
        //     console.log('result');
        // });
        }
    });
    return options;
};

 */
