'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 用户登录
 */
var result = require(':lib/Result');

var _require = require(':lib/Utils'),
    MODELS_PATH = _require.MODELS_PATH;

var _require2 = require(':lib/sequelize'),
    SOP = _require2.SOP,
    MuHomeDB = _require2.MuHomeDB;

var SysAdminBaseModel = MuHomeDB.import(MODELS_PATH + '/system/SysAdminBaseModel');
// MuHomeDB.import(`${MODELS_PATH}/system/SysPermissionModel`);
// MuHomeDB.import(`${MODELS_PATH}/system/SysRolesAuthModel`);
// MuHomeDB.import(`${MODELS_PATH}/system/SysRolesBaseModel`);
module.exports = function () {
    function _class() {
        (0, _classCallCheck3.default)(this, _class);
    }

    (0, _createClass3.default)(_class, [{
        key: 'addSysAdmin',

        /**
         * 添加管理平台
         * @param {*} param0
         */
        value: function () {
            var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_ref2) {
                var adminName = _ref2.adminName,
                    account = _ref2.account,
                    password = _ref2.password,
                    avatar = _ref2.avatar;
                var count, save;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                if (!(!account || !password)) {
                                    _context.next = 2;
                                    break;
                                }

                                return _context.abrupt('return', result.paramsLack());

                            case 2:
                                _context.prev = 2;
                                _context.next = 5;
                                return SysAdminBaseModel.count({
                                    where: { account: account, isDelete: false }
                                });

                            case 5:
                                count = _context.sent;

                                if (!(count > 0)) {
                                    _context.next = 8;
                                    break;
                                }

                                return _context.abrupt('return', result.failed('用户已存在!'));

                            case 8:
                                save = { adminName: adminName, account: account, password: password, avatar: avatar }; //保存数据

                                _context.next = 11;
                                return SysAdminBaseModel.create(save);

                            case 11:
                                return _context.abrupt('return', result.success());

                            case 14:
                                _context.prev = 14;
                                _context.t0 = _context['catch'](2);

                                console.log(_context.t0);
                                return _context.abrupt('return', result.failed(_context.t0));

                            case 18:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[2, 14]]);
            }));

            function addSysAdmin(_x) {
                return _ref.apply(this, arguments);
            }

            return addSysAdmin;
        }()

        /**
         * 获取系统管理员列表
         * @param {*} param0
         */

    }, {
        key: 'getSysAdminList',
        value: function () {
            var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(_ref4) {
                var account = _ref4.account,
                    page = _ref4.page,
                    limit = _ref4.limit;

                var queryData, _ref5, rows, count;

                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                queryData = {
                                    where: { isDelete: false },
                                    order: [['createdTime', 'DESC']],
                                    attributes: { exclude: ['isDelete'] }
                                };

                                if (account) {
                                    queryData.where['account'] = (0, _defineProperty3.default)({}, SOP.like, '%' + account + '%');
                                }
                                //分页
                                if (page && limit) {
                                    queryData.offset = Number((page - 1) * limit); //开始的数据索引
                                    queryData.limit = Number(limit); //每页限制返回的数据条数
                                };
                                _context2.prev = 4;
                                _context2.next = 7;
                                return SysAdminBaseModel.findAndCountAll(queryData);

                            case 7:
                                _ref5 = _context2.sent;
                                rows = _ref5.rows;
                                count = _ref5.count;
                                return _context2.abrupt('return', result.success(null, { list: rows, total: count }));

                            case 13:
                                _context2.prev = 13;
                                _context2.t0 = _context2['catch'](4);

                                console.log(_context2.t0);
                                return _context2.abrupt('return', result.failed(_context2.t0));

                            case 17:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this, [[4, 13]]);
            }));

            function getSysAdminList(_x2) {
                return _ref3.apply(this, arguments);
            }

            return getSysAdminList;
        }()

        /**
         * 删除系统管理员
         * @param {*} param0
         */

    }, {
        key: 'delSysAdminByIds',
        value: function () {
            var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(_ref7) {
                var ids = _ref7.ids,
                    isDelete = _ref7.isDelete;
                var del;
                return _regenerator2.default.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                if (!(!ids || !isDelete || !Array.isArray(ids))) {
                                    _context3.next = 2;
                                    break;
                                }

                                return _context3.abrupt('return', result.paramsLack());

                            case 2:
                                _context3.prev = 2;

                                //批量软删除
                                del = { where: { adminId: ids } };
                                _context3.next = 6;
                                return SysAdminBaseModel.update({ isDelete: isDelete }, del);

                            case 6:
                                return _context3.abrupt('return', result.success());

                            case 9:
                                _context3.prev = 9;
                                _context3.t0 = _context3['catch'](2);

                                console.log(_context3.t0);
                                return _context3.abrupt('return', result.failed(_context3.t0));

                            case 13:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this, [[2, 9]]);
            }));

            function delSysAdminByIds(_x3) {
                return _ref6.apply(this, arguments);
            }

            return delSysAdminByIds;
        }()

        /**
         * 编辑系统管理员
         * @param {*} data
         */

    }, {
        key: 'updateSysAdmin',
        value: function () {
            var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(data) {
                return _regenerator2.default.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                if (data.adminId) {
                                    _context4.next = 2;
                                    break;
                                }

                                return _context4.abrupt('return', result.paramsLack());

                            case 2:
                                _context4.prev = 2;
                                _context4.next = 5;
                                return SysAdminBaseModel.update(data, { where: { adminId: data.adminId } });

                            case 5:
                                return _context4.abrupt('return', result.success());

                            case 8:
                                _context4.prev = 8;
                                _context4.t0 = _context4['catch'](2);

                                console.log(_context4.t0);
                                return _context4.abrupt('return', result.failed(_context4.t0));

                            case 12:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, this, [[2, 8]]);
            }));

            function updateSysAdmin(_x4) {
                return _ref8.apply(this, arguments);
            }

            return updateSysAdmin;
        }()

        /**
         * 绑定管理员的角色
         * @param {*} data
         */

    }, {
        key: 'bindSysAdminRole',
        value: function () {
            var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(_ref10) {
                var adminId = _ref10.adminId,
                    roleId = _ref10.roleId,
                    roleName = _ref10.roleName;
                var bindData;
                return _regenerator2.default.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                if (!(!adminId || !roleId || !roleName)) {
                                    _context5.next = 2;
                                    break;
                                }

                                return _context5.abrupt('return', result.paramsLack());

                            case 2:
                                _context5.prev = 2;
                                bindData = { roleId: roleId, roleName: roleName };
                                _context5.next = 6;
                                return SysAdminBaseModel.update(bindData, { where: { adminId: adminId } });

                            case 6:
                                return _context5.abrupt('return', result.success());

                            case 9:
                                _context5.prev = 9;
                                _context5.t0 = _context5['catch'](2);

                                console.log(_context5.t0);
                                return _context5.abrupt('return', result.failed(_context5.t0));

                            case 13:
                            case 'end':
                                return _context5.stop();
                        }
                    }
                }, _callee5, this, [[2, 9]]);
            }));

            function bindSysAdminRole(_x5) {
                return _ref9.apply(this, arguments);
            }

            return bindSysAdminRole;
        }()

        /**
         * 获取管理员的基础信息
         * @param {*} param0
         */

    }, {
        key: 'getSysAdminBaseInfo',
        value: function () {
            var _ref11 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(_ref12) {
                var adminId = _ref12.adminId;
                var queryData, info;
                return _regenerator2.default.wrap(function _callee6$(_context6) {
                    while (1) {
                        switch (_context6.prev = _context6.next) {
                            case 0:
                                if (adminId) {
                                    _context6.next = 2;
                                    break;
                                }

                                return _context6.abrupt('return', result.paramsLack());

                            case 2:
                                queryData = {
                                    where: { adminId: adminId, isDelete: false },
                                    attributes: { exclude: ['isDelete', 'createdTime', 'updatedTime', 'password'] }
                                };
                                _context6.prev = 3;
                                _context6.next = 6;
                                return SysAdminBaseModel.findOne(queryData);

                            case 6:
                                info = _context6.sent;
                                return _context6.abrupt('return', result.success(null, info));

                            case 10:
                                _context6.prev = 10;
                                _context6.t0 = _context6['catch'](3);

                                console.log(_context6.t0);
                                return _context6.abrupt('return', result.failed(_context6.t0));

                            case 14:
                            case 'end':
                                return _context6.stop();
                        }
                    }
                }, _callee6, this, [[3, 10]]);
            }));

            function getSysAdminBaseInfo(_x6) {
                return _ref11.apply(this, arguments);
            }

            return getSysAdminBaseInfo;
        }()

        /**
         * 修改系统管理的密码
         * @param {*} data
         */

    }, {
        key: 'updateSysPassword',
        value: function () {
            var _ref13 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(_ref14) {
                var data = _ref14.data,
                    user = _ref14.user;

                var _ref15, adminId, account, password, newPassword, queryData, info, res;

                return _regenerator2.default.wrap(function _callee7$(_context7) {
                    while (1) {
                        switch (_context7.prev = _context7.next) {
                            case 0:
                                _ref15 = user && user.data, adminId = _ref15.adminId, account = _ref15.account;
                                password = data.password, newPassword = data.newPassword;

                                if (!(!adminId || !account || !password || !newPassword)) {
                                    _context7.next = 4;
                                    break;
                                }

                                return _context7.abrupt('return', result.paramsLack());

                            case 4:
                                queryData = {
                                    where: { adminId: adminId, account: account, isDelete: false },
                                    attributes: { exclude: ['isDelete', 'createdTime', 'updatedTime'] }
                                };
                                _context7.prev = 5;
                                _context7.next = 8;
                                return SysAdminBaseModel.findOne(queryData);

                            case 8:
                                info = _context7.sent;

                                if (info) {
                                    _context7.next = 11;
                                    break;
                                }

                                return _context7.abrupt('return', result.failed('\u7528\u6237\u4E0D\u5B58\u5728!'));

                            case 11:
                                if (!(password !== info.password)) {
                                    _context7.next = 13;
                                    break;
                                }

                                return _context7.abrupt('return', result.failed('\u5BC6\u7801\u9519\u8BEF!'));

                            case 13:
                                _context7.next = 15;
                                return SysAdminBaseModel.update({ password: newPassword }, { where: { adminId: adminId, account: account } });

                            case 15:
                                res = _context7.sent;
                                return _context7.abrupt('return', result.success(null, res));

                            case 19:
                                _context7.prev = 19;
                                _context7.t0 = _context7['catch'](5);

                                console.log(_context7.t0);
                                return _context7.abrupt('return', result.failed(_context7.t0));

                            case 23:
                            case 'end':
                                return _context7.stop();
                        }
                    }
                }, _callee7, this, [[5, 19]]);
            }));

            function updateSysPassword(_x7) {
                return _ref13.apply(this, arguments);
            }

            return updateSysPassword;
        }()
    }]);
    return _class;
}();