'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 系统管理员管理
 */
var KoaRouter = require('koa-router');
var LogsService = require(':services/system/LogsService');
var controller = new KoaRouter();
var service = new LogsService();

//获取系统日志
controller.get('/getSysLogList', function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(ctx) {
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return service.getSysLogList(ctx.state.user.data);

                    case 2:
                        ctx.body = _context.sent;

                    case 3:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function (_x) {
        return _ref.apply(this, arguments);
    };
}());

//获取系统日志内容
controller.get('/getSysLogContent', function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(ctx) {
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.next = 2;
                        return service.getSysLogContent(ctx.request.query, ctx.state.user.data);

                    case 2:
                        ctx.body = _context2.sent;

                    case 3:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined);
    }));

    return function (_x2) {
        return _ref2.apply(this, arguments);
    };
}());

//删除系统日志
controller.delete('/delSysLogByPaths', function () {
    var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(ctx) {
        return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        _context3.next = 2;
                        return service.delSysLogByPaths(ctx.request.body, ctx.state.user.data);

                    case 2:
                        ctx.body = _context3.sent;

                    case 3:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, undefined);
    }));

    return function (_x3) {
        return _ref3.apply(this, arguments);
    };
}());

module.exports = controller;