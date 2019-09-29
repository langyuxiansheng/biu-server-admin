const path = require('path');// 引入原生path模块
const log4js = require('koa-log4');// 引入koa-log4

log4js.configure({
    appenders: {
        // 访问日志
        access: {
            type: 'dateFile',
            pattern: '-yyyy-MM-dd.log', // 通过日期来生成文件
            alwaysIncludePattern: true, // 文件名始终以日期区分
            encoding: 'utf-8',
            filename: path.join('logs/', 'access.log') // 生成文件路径和文件名
        },
        // 系统日志
        application: {
            type: 'dateFile',
            pattern: '-yyyy-MM-dd.log', // 通过日期来生成文件
            alwaysIncludePattern: true, // 文件名始终以日期区分
            encoding: 'utf-8',
            filename: path.join('logs/', 'application.log') // 生成文件路径和文件名
        },
        accessErrorLogger: {
            type: 'dateFile',
            pattern: '-yyyy-MM-dd.log', // 通过日期来生成文件
            alwaysIncludePattern: true, // 文件名始终以日期区分
            encoding: 'utf-8',
            filename: path.join('logs/', 'accessErrorLogger.log') // 生成文件路径和文件名
        },
        accessSimpleLogger: {
            type: 'dateFile',
            pattern: '-yyyy-MM-dd.log', // 通过日期来生成文件
            alwaysIncludePattern: true, // 文件名始终以日期区分
            encoding: 'utf-8',
            filename: path.join('logs/', 'accessSimpleLogger.log') // 生成文件路径和文件名
        },
        sqlLog: {
            type: 'dateFile',
            pattern: '-yyyy-MM-dd.log', // 通过日期来生成文件
            alwaysIncludePattern: true, // 文件名始终以日期区分
            encoding: 'utf-8',
            filename: path.join('logs/', 'sqlLog.log') // 生成文件路径和文件名
        },
        out: {
            type: 'console'
        }
    },
    categories: {
        default: {appenders: ['out'], level: 'info'},
        access: {appenders: ['access'], level: 'info'},
        application: {appenders: ['application'], level: 'WARN'},
        accessErrorLogger: {appenders: ['accessErrorLogger'], level: 'WARN'},
        accessSimpleLogger: {appenders: ['accessSimpleLogger'], level: 'WARN'},
        sqlLog: {appenders: ['sqlLog'], level: 'info'}
    }
});

exports.accessLogger = () => log4js.koaLogger(log4js.getLogger('access')); // 记录所有访问级别的日志
exports.systemLogger = log4js.getLogger('application');  // 记录所有应用级别的日志
exports.accessErrorLogger = log4js.getLogger('accessErrorLogger');  // 记录所有访问时报错的日志
exports.accessSimpleLogger = log4js.getLogger('accessSimpleLogger');  // 记录所有访问时报错的日志
exports.sqlLog = log4js.getLogger('sqlLog');  // 记录所有访问时报错的日志
