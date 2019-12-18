'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Sequelize.js api说明文档
 * https: //itbilu.com/nodejs/npm/V1PExztfb.html
 */
// const sequelize = require('./init.sequelize')();
var Sequelize = require('sequelize/index');
var config = require(':config/server.base.config'); //配置文件

var _require = require(':lib/logger4'),
    systemLogger = _require.systemLogger,
    sqlLog = _require.sqlLog;

var SOP = Sequelize.Op;
/**
 * 列关联
 * @param {*} table
 * @param {*} col
 */
var COL = function COL(table, col) {
    return Sequelize.col(table + '.' + col);
};

/**
 * attr合成
 * @param {*} table
 * @param {*} list
 */
var Attrs = function Attrs(table, list) {
    var arr = [];
    for (var x in list) {
        arr.push(COL(table, list[x]));
    }
    return arr;
};

var BiuDB = new Sequelize(config.dbs.BiuDB.config.database, config.dbs.BiuDB.config.username, config.dbs.BiuDB.config.password, (0, _extends3.default)({}, config.dbs.BiuDB.config.options, {
    logging: function logging(sql) {
        //日志输出 不显示的输出设置为false
        sqlLog.info(config.dbs.BiuDB.config.database + '----' + sql);
    }
}));
BiuDB.authenticate().then(function (res) {
    systemLogger.info('\u8FDE\u63A5\u6570\u636E\u5E93\uFF1A' + config.dbs.BiuDB.config.database + ' \u6210\u529F!');
}).catch(function (err) {
    systemLogger.info('\u8FDE\u63A5\u6570\u636E\u5E93\uFF1A' + config.dbs.BiuDB.config.database + ' \u51FA\u9519!', err);
});

//同步数据库模型专用 此操作将会删除数据库的表重新创建,请谨慎使用
// BiuDB.sync({ force: true }).then(function(result) {
//     console.log('result');
// });

//配置关系型数据库ORM
module.exports = {
    Sequelize: Sequelize,
    SOP: SOP,
    COL: COL,
    Attrs: Attrs,
    BiuDB: BiuDB
};