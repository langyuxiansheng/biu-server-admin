'use strict';

var path = require('path'); // 引入原生path模块
var log4js = require('koa-log4'); // 引入koa-log4

var _require = require(':lib/Utils'),
    SRC_PATH = _require.SRC_PATH;

log4js.configure({
    appenders: {
        // 访问日志
        access: {
            type: 'dateFile',
            pattern: '-yyyy-MM-dd.log', // 通过日期来生成文件
            alwaysIncludePattern: true, // 文件名始终以日期区分
            encoding: 'utf-8',
            filename: path.join(SRC_PATH + '/logs/access/', 'access.log') // 生成文件路径和文件名
        },
        // 系统日志
        application: {
            type: 'dateFile',
            pattern: '-yyyy-MM-dd.log', // 通过日期来生成文件
            alwaysIncludePattern: true, // 文件名始终以日期区分
            encoding: 'utf-8',
            filename: path.join(SRC_PATH + '/logs/application/', 'application.log') // 生成文件路径和文件名
        },
        accessErrorLogger: {
            type: 'dateFile',
            pattern: '-yyyy-MM-dd.log', // 通过日期来生成文件
            alwaysIncludePattern: true, // 文件名始终以日期区分
            encoding: 'utf-8',
            filename: path.join(SRC_PATH + '/logs/accessErrorLogger/', 'accessErrorLogger.log') // 生成文件路径和文件名
        },
        accessSimpleLogger: {
            type: 'dateFile',
            pattern: '-yyyy-MM-dd.log', // 通过日期来生成文件
            alwaysIncludePattern: true, // 文件名始终以日期区分
            encoding: 'utf-8',
            filename: path.join(SRC_PATH + '/logs/accessSimpleLogger/', 'accessSimpleLogger.log') // 生成文件路径和文件名
        },
        sqlLog: {
            type: 'dateFile',
            pattern: '-yyyy-MM-dd.log', // 通过日期来生成文件
            alwaysIncludePattern: true, // 文件名始终以日期区分
            encoding: 'utf-8',
            filename: path.join(SRC_PATH + '/logs/sqlLog/', 'sqlLog.log') // 生成文件路径和文件名
        },
        out: {
            type: 'console'
        }
    },
    categories: {
        default: { appenders: ['out'], level: 'info' },
        access: { appenders: ['access'], level: 'info' },
        application: { appenders: ['application', 'out'], level: 'WARN' },
        accessErrorLogger: { appenders: ['accessErrorLogger', 'out'], level: 'WARN' },
        accessSimpleLogger: { appenders: ['accessSimpleLogger', 'out'], level: 'WARN' },
        sqlLog: { appenders: ['sqlLog', 'out'], level: 'info' }
    }
});

module.exports = {
    accessLogger: function accessLogger() {
        return log4js.koaLogger(log4js.getLogger('access'));
    }, // 记录所有访问级别的日志
    systemLogger: log4js.getLogger('application'), //记录所有应用级别的日志
    accessErrorLogger: log4js.getLogger('accessErrorLogger'), //记录所有访问时报错的日志
    accessSimpleLogger: log4js.getLogger('accessSimpleLogger'), //记录所有简单访问时报错的日志
    sqlLog: log4js.getLogger('sqlLog') //记录所有SQL的日志
};