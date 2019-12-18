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

var RolesBaseModel = BiuDB.import(MODELS_PATH + '/system/RolesBaseModel');
module.exports = function () {
    function _class() {
        (0, _classCallCheck3.default)(this, _class);
    }

    (0, _createClass3.default)(_class, [{
        key: 'addSysRole',

        /**
         * 添加系统角色
         * @param {*} param0
         */
        value: function () {
            var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_ref2) {
                var roleName = _ref2.roleName;
                var count, save;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                if (roleName) {
                                    _context.next = 2;
                                    break;
                                }

                                return _context.abrupt('return', result.paramsLack());

                            case 2:
                                _context.prev = 2;
                                _context.next = 5;
                                return RolesBaseModel.count({
                                    where: { roleName: roleName, isDelete: false }
                                });

                            case 5:
                                count = _context.sent;

                                if (!(count > 0)) {
                                    _context.next = 8;
                                    break;
                                }

                                return _context.abrupt('return', result.failed('角色已存在!'));

                            case 8:
                                save = { roleName: roleName }; //保存数据

                                _context.next = 11;
                                return RolesBaseModel.create(save);

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

            function addSysRole(_x) {
                return _ref.apply(this, arguments);
            }

            return addSysRole;
        }()

        /**
         * 获取系统角色列表
         * @param {*} param0
         */

    }, {
        key: 'getSysRoleList',
        value: function () {
            var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(_ref4) {
                var roleName = _ref4.roleName,
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

                                if (roleName) {
                                    queryData.where['roleName'] = (0, _defineProperty3.default)({}, SOP.like, '%' + roleName + '%');
                                }
                                //分页
                                if (page && limit) {
                                    queryData.offset = Number((page - 1) * limit); //开始的数据索引
                                    queryData.limit = Number(limit); //每页限制返回的数据条数
                                };
                                _context2.prev = 4;
                                _context2.next = 7;
                                return RolesBaseModel.findAndCountAll(queryData);

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

            function getSysRoleList(_x2) {
                return _ref3.apply(this, arguments);
            }

            return getSysRoleList;
        }()

        /**
         * 删除系统角色
         * @param {*} param0
         */

    }, {
        key: 'delSysRoleByIds',
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
                                del = { where: { roleId: ids } };
                                _context3.next = 6;
                                return RolesBaseModel.update({ isDelete: isDelete }, del);

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

            function delSysRoleByIds(_x3) {
                return _ref6.apply(this, arguments);
            }

            return delSysRoleByIds;
        }()

        /**
         * 编辑系统角色
         * @param {*} data
         */

    }, {
        key: 'updateSysRole',
        value: function () {
            var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(data) {
                return _regenerator2.default.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                if (data.roleId) {
                                    _context4.next = 2;
                                    break;
                                }

                                return _context4.abrupt('return', result.paramsLack());

                            case 2:
                                _context4.prev = 2;
                                _context4.next = 5;
                                return RolesBaseModel.update(data, { where: { roleId: data.roleId } });

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

            function updateSysRole(_x4) {
                return _ref8.apply(this, arguments);
            }

            return updateSysRole;
        }()
    }]);
    return _class;
}();