'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var log4js = require('log4js');
// 引入日志输出信息的封装文件
var access = function access(ctx, message, commonInfo) {
    var _ctx$request = ctx.request,
        method = _ctx$request.method,
        url = _ctx$request.url,
        host = _ctx$request.host,
        headers = _ctx$request.headers;

    var client = {
        method: method,
        url: url,
        host: host,
        message: message,
        referer: headers['referer'], // 请求的源地址
        userAgent: headers['user-agent'] // 客户端信息 设备及浏览器信息
    };
    return (0, _stringify2.default)((0, _assign2.default)(commonInfo, client));
};

var methods = ['trace', 'debug', 'info', 'warn', 'error', 'fatal', 'mark'];

var baseInfo = {
    appLogLevel: 'debug',
    dir: 'logs',
    env: 'dev',
    projectName: 'admin-client',
    serverIp: '127.0.0.1'
};
var env = baseInfo.env,
    appLogLevel = baseInfo.appLogLevel,
    dir = baseInfo.dir,
    serverIp = baseInfo.serverIp,
    projectName = baseInfo.projectName;
// 增加常量，用来存储公用的日志信息

var commonInfo = { projectName: projectName, serverIp: serverIp };
module.exports = function () {
    var contextLogger = {};
    var appenders = {};
    appenders.cheese = {
        type: 'dateFile',
        filename: dir + '/task',
        pattern: '-yyyy-MM-dd.log',
        alwaysIncludePattern: true
    };

    if (env === 'dev' || env === 'local' || env === 'development') {
        appenders.out = {
            type: 'console'
        };
    }
    var config = {
        appenders: appenders,
        categories: {
            default: {
                appenders: (0, _keys2.default)(appenders),
                level: appLogLevel
            }
        }
    };

    var logger = log4js.getLogger('cheese');

    return function () {
        var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(ctx, next) {
            var start, responseTime;
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            start = Date.now();

                            log4js.configure(config);
                            methods.forEach(function (method, i) {
                                contextLogger[method] = function (message) {
                                    // 将入参换为函数返回的字符串
                                    logger[method](access(ctx, message, commonInfo));
                                };
                            });
                            ctx.log = contextLogger;
                            _context.next = 6;
                            return next();

                        case 6:
                            responseTime = Date.now() - start;

                            logger.info(access(ctx, { responseTime: '\u54CD\u5E94\u65F6\u95F4\u4E3A' + responseTime / 1000 + 's' }, commonInfo));

                        case 8:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, undefined);
        }));

        return function (_x, _x2) {
            return _ref.apply(this, arguments);
        };
    }();
};