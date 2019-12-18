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
var AdminService = require(':services/system/AdminService');
var controller = new KoaRouter();
var service = new AdminService();

//添加
controller.post('/addSysAdmin', function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(ctx) {
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return service.addSysAdmin(ctx.request.body, ctx.state.user.data);

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

//查询系统管理员
controller.get('/getSysAdminList', function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(ctx) {
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.next = 2;
                        return service.getSysAdminList(ctx.request.query, ctx.state.user.data);

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

//删除系统管理员
controller.delete('/delSysAdminByIds', function () {
    var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(ctx) {
        return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        _context3.next = 2;
                        return service.delSysAdminByIds(ctx.request.body, ctx.state.user.data);

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

//更新系统管理员信息
controller.put('/updateSysAdmin', function () {
    var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(ctx) {
        return _regenerator2.default.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        _context4.next = 2;
                        return service.updateSysAdmin(ctx.request.body);

                    case 2:
                        ctx.body = _context4.sent;

                    case 3:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, undefined);
    }));

    return function (_x4) {
        return _ref4.apply(this, arguments);
    };
}());

//绑定管理员的角色
controller.put('/bindSysAdminRole', function () {
    var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(ctx) {
        return _regenerator2.default.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        _context5.next = 2;
                        return service.bindSysAdminRole(ctx.request.body, ctx.state.user.data);

                    case 2:
                        ctx.body = _context5.sent;

                    case 3:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _callee5, undefined);
    }));

    return function (_x5) {
        return _ref5.apply(this, arguments);
    };
}());

//获取管理员的基础信息
controller.get('/getSysAdminBaseInfo', function () {
    var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(ctx) {
        return _regenerator2.default.wrap(function _callee6$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:
                        _context6.next = 2;
                        return service.getSysAdminBaseInfo(ctx.request.query);

                    case 2:
                        ctx.body = _context6.sent;

                    case 3:
                    case 'end':
                        return _context6.stop();
                }
            }
        }, _callee6, undefined);
    }));

    return function (_x6) {
        return _ref6.apply(this, arguments);
    };
}());

//编辑系统管理员密码
controller.put('/updateSysPassword', function () {
    var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(ctx) {
        return _regenerator2.default.wrap(function _callee7$(_context7) {
            while (1) {
                switch (_context7.prev = _context7.next) {
                    case 0:
                        _context7.next = 2;
                        return service.updateSysPassword({ data: ctx.request.body }, ctx.state.user.data);

                    case 2:
                        ctx.body = _context7.sent;

                    case 3:
                    case 'end':
                        return _context7.stop();
                }
            }
        }, _callee7, undefined);
    }));

    return function (_x7) {
        return _ref7.apply(this, arguments);
    };
}());

module.exports = controller;