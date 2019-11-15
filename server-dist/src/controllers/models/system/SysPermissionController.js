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

var _require = require(':services'),
    SysPermissionService = _require.system.SysPermissionService;

var controller = new KoaRouter();
var service = new SysPermissionService();

//添加权限菜单
controller.post('/addSysPermission', function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(ctx) {
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return service.addSysPermission(ctx.request.body);

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

//查询权限菜单
controller.get('/getSysPermissionList', function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(ctx) {
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.next = 2;
                        return service.getSysPermissionList(ctx.request.query);

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

//删除权限菜单
controller.delete('/delSysPermissionByIds', function () {
    var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(ctx) {
        return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        _context3.next = 2;
                        return service.delSysPermissionByIds(ctx.request.body);

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

//更新权限菜单
controller.put('/updateSysPermission', function () {
    var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(ctx) {
        return _regenerator2.default.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        _context4.next = 2;
                        return service.updateSysPermission(ctx.request.body);

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

//权限菜单树形
controller.get('/getSysPermissionListToTree', function () {
    var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(ctx) {
        return _regenerator2.default.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        _context5.next = 2;
                        return service.getSysPermissionListToTree(ctx.request.query);

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

//获取角色的权限
controller.get('/getSysRolePermissionListToTree', function () {
    var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(ctx) {
        return _regenerator2.default.wrap(function _callee6$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:
                        _context6.next = 2;
                        return service.getSysRolePermissionListToTree(ctx.request.query);

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

//设置角色权限
controller.put('/setSysRolePermission', function () {
    var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(ctx) {
        return _regenerator2.default.wrap(function _callee7$(_context7) {
            while (1) {
                switch (_context7.prev = _context7.next) {
                    case 0:
                        _context7.next = 2;
                        return service.setSysRolePermission(ctx.request.body);

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

//清除角色的所有权限
controller.delete('/clearSysRoleAllPermission', function () {
    var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8(ctx) {
        return _regenerator2.default.wrap(function _callee8$(_context8) {
            while (1) {
                switch (_context8.prev = _context8.next) {
                    case 0:
                        _context8.next = 2;
                        return service.clearSysRoleAllPermission(ctx.request.body);

                    case 2:
                        ctx.body = _context8.sent;

                    case 3:
                    case 'end':
                        return _context8.stop();
                }
            }
        }, _callee8, undefined);
    }));

    return function (_x8) {
        return _ref8.apply(this, arguments);
    };
}());

//获取角色的树形菜单
controller.get('/getSysRoleMenusToTree', function () {
    var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9(ctx) {
        var data;
        return _regenerator2.default.wrap(function _callee9$(_context9) {
            while (1) {
                switch (_context9.prev = _context9.next) {
                    case 0:
                        data = ctx.state.user.data;
                        _context9.next = 3;
                        return service.getSysRoleMenusToTree(data);

                    case 3:
                        ctx.body = _context9.sent;

                    case 4:
                    case 'end':
                        return _context9.stop();
                }
            }
        }, _callee9, undefined);
    }));

    return function (_x9) {
        return _ref9.apply(this, arguments);
    };
}());

module.exports = controller;