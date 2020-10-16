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
    BiuDB = _require2.BiuDB;

var AdminBaseModel = BiuDB.import(MODELS_PATH + '/system/AdminBaseModel');
// BiuDB.import(`${MODELS_PATH}/system/PermissionModel`);
// BiuDB.import(`${MODELS_PATH}/system/RolesAuthModel`);
// BiuDB.import(`${MODELS_PATH}/system/RolesBaseModel`);
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
            var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_ref2, _ref3) {
                var adminName = _ref2.adminName,
                    account = _ref2.account,
                    password = _ref2.password,
                    avatar = _ref2.avatar;
                var isAdmin = _ref3.isAdmin;
                var count, save;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                if (isAdmin) {
                                    _context.next = 2;
                                    break;
                                }

                                return _context.abrupt('return', result.noAuthority());

                            case 2:
                                if (!(!account || !password)) {
                                    _context.next = 4;
                                    break;
                                }

                                return _context.abrupt('return', result.paramsLack());

                            case 4:
                                _context.prev = 4;
                                _context.next = 7;
                                return AdminBaseModel.count({
                                    where: { account: account, isDelete: false }
                                });

                            case 7:
                                count = _context.sent;

                                if (!(count > 0)) {
                                    _context.next = 10;
                                    break;
                                }

                                return _context.abrupt('return', result.failed('用户已存在!'));

                            case 10:
                                save = { adminName: adminName, account: account, password: password, avatar: avatar }; //保存数据

                                _context.next = 13;
                                return AdminBaseModel.create(save);

                            case 13:
                                return _context.abrupt('return', result.success());

                            case 16:
                                _context.prev = 16;
                                _context.t0 = _context['catch'](4);

                                console.log(_context.t0);
                                return _context.abrupt('return', result.failed(_context.t0));

                            case 20:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[4, 16]]);
            }));

            function addSysAdmin(_x, _x2) {
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
            var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(_ref5, _ref6) {
                var account = _ref5.account,
                    page = _ref5.page,
                    limit = _ref5.limit;
                var isAdmin = _ref6.isAdmin;

                var queryData, _ref7, rows, count;

                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                if (isAdmin) {
                                    _context2.next = 2;
                                    break;
                                }

                                return _context2.abrupt('return', result.noAuthority());

                            case 2:
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
                                _context2.prev = 6;
                                _context2.next = 9;
                                return AdminBaseModel.findAndCountAll(queryData);

                            case 9:
                                _ref7 = _context2.sent;
                                rows = _ref7.rows;
                                count = _ref7.count;
                                return _context2.abrupt('return', result.success(null, { list: rows, total: count }));

                            case 15:
                                _context2.prev = 15;
                                _context2.t0 = _context2['catch'](6);

                                console.log(_context2.t0);
                                return _context2.abrupt('return', result.failed(_context2.t0));

                            case 19:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this, [[6, 15]]);
            }));

            function getSysAdminList(_x3, _x4) {
                return _ref4.apply(this, arguments);
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
            var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(_ref9, _ref10) {
                var ids = _ref9.ids,
                    isDelete = _ref9.isDelete;
                var isAdmin = _ref10.isAdmin;
                var del;
                return _regenerator2.default.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                if (isAdmin) {
                                    _context3.next = 2;
                                    break;
                                }

                                return _context3.abrupt('return', result.noAuthority());

                            case 2:
                                if (!(!ids || !isDelete || !Array.isArray(ids))) {
                                    _context3.next = 4;
                                    break;
                                }

                                return _context3.abrupt('return', result.paramsLack());

                            case 4:
                                _context3.prev = 4;

                                //批量软删除
                                del = { where: { adminId: ids } };
                                _context3.next = 8;
                                return AdminBaseModel.update({ isDelete: isDelete }, del);

                            case 8:
                                return _context3.abrupt('return', result.success());

                            case 11:
                                _context3.prev = 11;
                                _context3.t0 = _context3['catch'](4);

                                console.log(_context3.t0);
                                return _context3.abrupt('return', result.failed(_context3.t0));

                            case 15:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this, [[4, 11]]);
            }));

            function delSysAdminByIds(_x5, _x6) {
                return _ref8.apply(this, arguments);
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
            var _ref11 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(data, _ref12) {
                var isAdmin = _ref12.isAdmin;
                return _regenerator2.default.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                if (isAdmin) {
                                    _context4.next = 2;
                                    break;
                                }

                                return _context4.abrupt('return', result.noAuthority());

                            case 2:
                                if (data.adminId) {
                                    _context4.next = 4;
                                    break;
                                }

                                return _context4.abrupt('return', result.paramsLack());

                            case 4:
                                _context4.prev = 4;
                                _context4.next = 7;
                                return AdminBaseModel.update(data, { where: { adminId: data.adminId } });

                            case 7:
                                return _context4.abrupt('return', result.success());

                            case 10:
                                _context4.prev = 10;
                                _context4.t0 = _context4['catch'](4);

                                console.log(_context4.t0);
                                return _context4.abrupt('return', result.failed(_context4.t0));

                            case 14:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, this, [[4, 10]]);
            }));

            function updateSysAdmin(_x7, _x8) {
                return _ref11.apply(this, arguments);
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
            var _ref13 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(_ref14, _ref15) {
                var adminId = _ref14.adminId,
                    roleId = _ref14.roleId,
                    roleName = _ref14.roleName;
                var isAdmin = _ref15.isAdmin;
                var bindData;
                return _regenerator2.default.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                if (isAdmin) {
                                    _context5.next = 2;
                                    break;
                                }

                                return _context5.abrupt('return', result.noAuthority());

                            case 2:
                                if (!(!adminId || !roleId || !roleName)) {
                                    _context5.next = 4;
                                    break;
                                }

                                return _context5.abrupt('return', result.paramsLack());

                            case 4:
                                _context5.prev = 4;
                                bindData = { roleId: roleId, roleName: roleName };
                                _context5.next = 8;
                                return AdminBaseModel.update(bindData, { where: { adminId: adminId } });

                            case 8:
                                return _context5.abrupt('return', result.success());

                            case 11:
                                _context5.prev = 11;
                                _context5.t0 = _context5['catch'](4);

                                console.log(_context5.t0);
                                return _context5.abrupt('return', result.failed(_context5.t0));

                            case 15:
                            case 'end':
                                return _context5.stop();
                        }
                    }
                }, _callee5, this, [[4, 11]]);
            }));

            function bindSysAdminRole(_x9, _x10) {
                return _ref13.apply(this, arguments);
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
            var _ref16 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(_ref17) {
                var adminId = _ref17.adminId;
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
                                return AdminBaseModel.findOne(queryData);

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

            function getSysAdminBaseInfo(_x11) {
                return _ref16.apply(this, arguments);
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
            var _ref18 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(_ref19, _ref20) {
                var data = _ref19.data;
                var adminId = _ref20.adminId,
                    account = _ref20.account;
                var password, newPassword, queryData, info, res;
                return _regenerator2.default.wrap(function _callee7$(_context7) {
                    while (1) {
                        switch (_context7.prev = _context7.next) {
                            case 0:
                                password = data.password, newPassword = data.newPassword;

                                if (!(!adminId || !account || !password || !newPassword)) {
                                    _context7.next = 3;
                                    break;
                                }

                                return _context7.abrupt('return', result.paramsLack());

                            case 3:
                                queryData = {
                                    where: { adminId: adminId, account: account, isDelete: false },
                                    attributes: { exclude: ['isDelete', 'createdTime', 'updatedTime'] }
                                };
                                _context7.prev = 4;
                                _context7.next = 7;
                                return AdminBaseModel.findOne(queryData);

                            case 7:
                                info = _context7.sent;

                                if (info) {
                                    _context7.next = 10;
                                    break;
                                }

                                return _context7.abrupt('return', result.failed('\u7528\u6237\u4E0D\u5B58\u5728!'));

                            case 10:
                                if (!(password !== info.password)) {
                                    _context7.next = 12;
                                    break;
                                }

                                return _context7.abrupt('return', result.failed('\u5BC6\u7801\u9519\u8BEF!'));

                            case 12:
                                _context7.next = 14;
                                return AdminBaseModel.update({ password: newPassword }, { where: { adminId: adminId, account: account } });

                            case 14:
                                res = _context7.sent;
                                return _context7.abrupt('return', result.success(null, res));

                            case 18:
                                _context7.prev = 18;
                                _context7.t0 = _context7['catch'](4);

                                console.log(_context7.t0);
                                return _context7.abrupt('return', result.failed(_context7.t0));

                            case 22:
                            case 'end':
                                return _context7.stop();
                        }
                    }
                }, _callee7, this, [[4, 18]]);
            }));

            function updateSysPassword(_x12, _x13) {
                return _ref18.apply(this, arguments);
            }

            return updateSysPassword;
        }()
    }]);
    return _class;
}();