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
 * 权限管理
 */
var result = require(':lib/Result');

var _require = require(':lib/Utils'),
    MODELS_PATH = _require.MODELS_PATH,
    listToTree = _require.listToTree;

var _require2 = require(':lib/sequelize'),
    Attrs = _require2.Attrs,
    SOP = _require2.SOP,
    BiuDB = _require2.BiuDB,
    COL = _require2.COL;

var PermissionModel = BiuDB.import(MODELS_PATH + '/system/PermissionModel');
var RolesAuthModel = BiuDB.import(MODELS_PATH + '/system/RolesAuthModel');
module.exports = function () {
    function _class() {
        (0, _classCallCheck3.default)(this, _class);

        PermissionModel.sync().then(function (res) {
            console.log('PermissionModel \u540C\u6B65\u6210\u529F', res);
        });
        RolesAuthModel.sync().then(function (res) {
            console.log('RolesAuthModel \u540C\u6B65\u6210\u529F', res);
        });
    }

    /**
     * 添加系统权限
     * @param {*} user
     */


    (0, _createClass3.default)(_class, [{
        key: 'addSysPermission',
        value: function () {
            var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(data, _ref2) {
                var isAdmin = _ref2.isAdmin;
                var title, type, path, name, parentId, queryData, count;
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
                                title = data.title, type = data.type, path = data.path, name = data.name, parentId = data.parentId;

                                if (!(type == 1 && (!title || !path || !name))) {
                                    _context.next = 7;
                                    break;
                                }

                                return _context.abrupt('return', result.paramsLack());

                            case 7:
                                if (!(type == 2 && (!title || !name))) {
                                    _context.next = 9;
                                    break;
                                }

                                return _context.abrupt('return', result.paramsLack());

                            case 9:
                                _context.prev = 9;
                                queryData = {
                                    where: { title: title, path: path, isDelete: false }
                                };

                                if (type == 2) {
                                    queryData.where.parentId = parentId;
                                }
                                //查询是否存在
                                _context.next = 14;
                                return PermissionModel.count(queryData);

                            case 14:
                                count = _context.sent;

                                if (!(count > 0)) {
                                    _context.next = 17;
                                    break;
                                }

                                return _context.abrupt('return', result.failed('权限已存在!'));

                            case 17:
                                _context.next = 19;
                                return PermissionModel.create(data);

                            case 19:
                                return _context.abrupt('return', result.success());

                            case 22:
                                _context.prev = 22;
                                _context.t0 = _context['catch'](9);

                                console.log(_context.t0);
                                return _context.abrupt('return', result.failed(_context.t0));

                            case 26:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[9, 22]]);
            }));

            function addSysPermission(_x, _x2) {
                return _ref.apply(this, arguments);
            }

            return addSysPermission;
        }()

        /**
         * 获取系统权限菜单列表
         * @param {*} param0
         */

    }, {
        key: 'getSysPermissionList',
        value: function () {
            var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(_ref4, _ref5) {
                var title = _ref4.title,
                    page = _ref4.page,
                    limit = _ref4.limit;
                var isAdmin = _ref5.isAdmin;

                var queryData, _ref6, rows, count;

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
                                    order: [['sort', 'ASC']],
                                    attributes: { exclude: ['isDelete'] }
                                };


                                if (title) {
                                    queryData.where['title'] = (0, _defineProperty3.default)({}, SOP.like, '%' + title + '%');
                                }
                                //分页
                                if (page && limit) {
                                    queryData.offset = Number((page - 1) * limit); //开始的数据索引
                                    queryData.limit = Number(limit); //每页限制返回的数据条数
                                };
                                _context2.prev = 6;
                                _context2.next = 9;
                                return PermissionModel.findAndCountAll(queryData);

                            case 9:
                                _ref6 = _context2.sent;
                                rows = _ref6.rows;
                                count = _ref6.count;
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

            function getSysPermissionList(_x3, _x4) {
                return _ref3.apply(this, arguments);
            }

            return getSysPermissionList;
        }()

        /**
         * 删除系统权限菜单
         * @param {*} param0
         */

    }, {
        key: 'delSysPermissionByIds',
        value: function () {
            var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(_ref8, _ref9) {
                var ids = _ref8.ids,
                    isDelete = _ref8.isDelete;
                var isAdmin = _ref9.isAdmin;
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
                                del = {
                                    where: (0, _defineProperty3.default)({}, SOP.or, [{ permissionId: ids }, { parentId: ids }])
                                };
                                _context3.next = 8;
                                return PermissionModel.update({ isDelete: isDelete }, del);

                            case 8:
                                //从中间表删除对应的权限
                                RolesAuthModel.destroy({
                                    where: (0, _defineProperty3.default)({}, SOP.or, [{ permissionId: ids }, { parentId: ids }])
                                });
                                return _context3.abrupt('return', result.success());

                            case 12:
                                _context3.prev = 12;
                                _context3.t0 = _context3['catch'](4);

                                console.log(_context3.t0);
                                return _context3.abrupt('return', result.failed(_context3.t0));

                            case 16:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this, [[4, 12]]);
            }));

            function delSysPermissionByIds(_x5, _x6) {
                return _ref7.apply(this, arguments);
            }

            return delSysPermissionByIds;
        }()

        /**
         * 编辑系统权限菜单
         * @param {*} data
         */

    }, {
        key: 'updateSysPermission',
        value: function () {
            var _ref10 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(data, _ref11) {
                var isAdmin = _ref11.isAdmin;
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
                                if (data.permissionId) {
                                    _context4.next = 4;
                                    break;
                                }

                                return _context4.abrupt('return', result.paramsLack());

                            case 4:
                                _context4.prev = 4;
                                _context4.next = 7;
                                return PermissionModel.update(data, { where: { permissionId: data.permissionId } });

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

            function updateSysPermission(_x7, _x8) {
                return _ref10.apply(this, arguments);
            }

            return updateSysPermission;
        }()

        /**
         * 获取树状权限列表
         * @param {*} param0
         */

    }, {
        key: 'getSysPermissionListToTree',
        value: function () {
            var _ref12 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(_ref13, _ref14) {
                var title = _ref13.title,
                    page = _ref13.page,
                    limit = _ref13.limit;
                var isAdmin = _ref14.isAdmin;

                var queryData, _ref15, rows, count, list;

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
                                queryData = {
                                    where: { isDelete: false },
                                    order: [
                                    // ['createdTime', 'DESC'],
                                    ['sort', 'ASC']],
                                    attributes: ['permissionId', 'parentId', 'title', 'path', 'type']
                                };

                                if (title) {
                                    queryData.where['title'] = (0, _defineProperty3.default)({}, SOP.like, '%' + title + '%');
                                }
                                //分页
                                if (page && limit) {
                                    queryData.offset = Number((page - 1) * limit); //开始的数据索引
                                    queryData.limit = Number(limit); //每页限制返回的数据条数
                                };
                                _context5.prev = 6;
                                _context5.next = 9;
                                return PermissionModel.findAndCountAll(queryData);

                            case 9:
                                _ref15 = _context5.sent;
                                rows = _ref15.rows;
                                count = _ref15.count;
                                list = listToTree(rows, 'parentId', 'permissionId', 0);
                                return _context5.abrupt('return', result.success(null, { list: list, total: count }));

                            case 16:
                                _context5.prev = 16;
                                _context5.t0 = _context5['catch'](6);

                                console.log(_context5.t0);
                                return _context5.abrupt('return', result.failed(_context5.t0));

                            case 20:
                            case 'end':
                                return _context5.stop();
                        }
                    }
                }, _callee5, this, [[6, 16]]);
            }));

            function getSysPermissionListToTree(_x9, _x10) {
                return _ref12.apply(this, arguments);
            }

            return getSysPermissionListToTree;
        }()

        /**
         * 获取角色的权限(权限设置)
         * @param {*} param0
         */

    }, {
        key: 'getSysRolePermissionListToTree',
        value: function () {
            var _ref16 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(_ref17) {
                var roleId = _ref17.roleId;
                var rows, checkeds, list;
                return _regenerator2.default.wrap(function _callee6$(_context6) {
                    while (1) {
                        switch (_context6.prev = _context6.next) {
                            case 0:
                                if (roleId) {
                                    _context6.next = 2;
                                    break;
                                }

                                return _context6.abrupt('return', result.paramsLack());

                            case 2:
                                _context6.prev = 2;
                                _context6.next = 5;
                                return PermissionModel.findAll({
                                    where: { isDelete: false },
                                    order: [['sort', 'ASC']],
                                    attributes: ['permissionId', 'parentId', 'title', 'path', 'type']
                                });

                            case 5:
                                rows = _context6.sent;
                                _context6.next = 8;
                                return RolesAuthModel.findAll({
                                    where: { roleId: roleId },
                                    attributes: { exclude: ['createdTime', 'updatedTime'] }
                                });

                            case 8:
                                checkeds = _context6.sent;

                                //转为树形结构
                                list = listToTree(rows, 'parentId', 'permissionId', 0);
                                return _context6.abrupt('return', result.success(null, { list: list, checkeds: checkeds }));

                            case 13:
                                _context6.prev = 13;
                                _context6.t0 = _context6['catch'](2);

                                console.log(_context6.t0);
                                return _context6.abrupt('return', result.failed(_context6.t0));

                            case 17:
                            case 'end':
                                return _context6.stop();
                        }
                    }
                }, _callee6, this, [[2, 13]]);
            }));

            function getSysRolePermissionListToTree(_x11) {
                return _ref16.apply(this, arguments);
            }

            return getSysRolePermissionListToTree;
        }()

        /**
         * 设置系统角色的权限
         * @param {*} data
         */

    }, {
        key: 'setSysRolePermission',
        value: function () {
            var _ref18 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(data, _ref19) {
                var isAdmin = _ref19.isAdmin;
                var list, roleId, records;
                return _regenerator2.default.wrap(function _callee7$(_context7) {
                    while (1) {
                        switch (_context7.prev = _context7.next) {
                            case 0:
                                if (isAdmin) {
                                    _context7.next = 2;
                                    break;
                                }

                                return _context7.abrupt('return', result.noAuthority());

                            case 2:
                                if (!(!data.roleId || !Array.isArray(data.list))) {
                                    _context7.next = 4;
                                    break;
                                }

                                return _context7.abrupt('return', result.paramsLack());

                            case 4:
                                list = data.list, roleId = data.roleId;
                                _context7.prev = 5;

                                //插入多条记录
                                records = list.map(function (item) {
                                    item.roleId = roleId;
                                    if (item.parentId == 0) delete item['parentId'];
                                    return item;
                                });
                                //先清除

                                _context7.next = 9;
                                return RolesAuthModel.destroy({ where: { roleId: roleId } });

                            case 9:
                                _context7.next = 11;
                                return RolesAuthModel.bulkCreate(records);

                            case 11:
                                return _context7.abrupt('return', result.success());

                            case 14:
                                _context7.prev = 14;
                                _context7.t0 = _context7['catch'](5);

                                console.log(_context7.t0);
                                return _context7.abrupt('return', result.failed(_context7.t0));

                            case 18:
                            case 'end':
                                return _context7.stop();
                        }
                    }
                }, _callee7, this, [[5, 14]]);
            }));

            function setSysRolePermission(_x12, _x13) {
                return _ref18.apply(this, arguments);
            }

            return setSysRolePermission;
        }()

        /**
         * 清除角色的所有权限
         * @param {*} data
         */

    }, {
        key: 'clearSysRoleAllPermission',
        value: function () {
            var _ref20 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8(_ref21, _ref22) {
                var roleId = _ref21.roleId;
                var isAdmin = _ref22.isAdmin;
                return _regenerator2.default.wrap(function _callee8$(_context8) {
                    while (1) {
                        switch (_context8.prev = _context8.next) {
                            case 0:
                                if (isAdmin) {
                                    _context8.next = 2;
                                    break;
                                }

                                return _context8.abrupt('return', result.noAuthority());

                            case 2:
                                if (roleId) {
                                    _context8.next = 4;
                                    break;
                                }

                                return _context8.abrupt('return', result.paramsLack());

                            case 4:
                                _context8.prev = 4;
                                _context8.next = 7;
                                return RolesAuthModel.destroy({ where: { roleId: roleId } });

                            case 7:
                                return _context8.abrupt('return', result.success());

                            case 10:
                                _context8.prev = 10;
                                _context8.t0 = _context8['catch'](4);

                                console.log(_context8.t0);
                                return _context8.abrupt('return', result.failed(_context8.t0));

                            case 14:
                            case 'end':
                                return _context8.stop();
                        }
                    }
                }, _callee8, this, [[4, 10]]);
            }));

            function clearSysRoleAllPermission(_x14, _x15) {
                return _ref20.apply(this, arguments);
            }

            return clearSysRoleAllPermission;
        }()

        /**
         * 获取角色的树形菜单
         * @param {*} param0
         */

    }, {
        key: 'getSysRoleMenusToTree',
        value: function () {
            var _ref23 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9(_ref24) {
                var roleId = _ref24.roleId,
                    isAdmin = _ref24.isAdmin;

                var table, includes, _rows, _list, rows, list;

                return _regenerator2.default.wrap(function _callee9$(_context9) {
                    while (1) {
                        switch (_context9.prev = _context9.next) {
                            case 0:
                                if (roleId) {
                                    _context9.next = 2;
                                    break;
                                }

                                return _context9.abrupt('return', result.paramsLack());

                            case 2:
                                table = PermissionModel.getTableName();
                                includes = ['title', 'type', 'path', 'name', 'icon', 'sort', 'remark', 'parentId'];
                                _context9.prev = 4;

                                if (!isAdmin) {
                                    _context9.next = 11;
                                    break;
                                }

                                _context9.next = 8;
                                return PermissionModel.findAll({
                                    where: { isDelete: false },
                                    order: [['sort', 'ASC']],
                                    attributes: ['permissionId'].concat(includes)
                                });

                            case 8:
                                _rows = _context9.sent;

                                //转为树形结构
                                _list = listToTree(_rows, 'parentId', 'permissionId', 0);
                                return _context9.abrupt('return', result.success(null, _list));

                            case 11:
                                //建立表关联
                                RolesAuthModel.belongsTo(PermissionModel, { foreignKey: 'permissionId' });
                                //查询中间表
                                _context9.next = 14;
                                return RolesAuthModel.findAll({
                                    where: { roleId: roleId },
                                    include: [{
                                        where: { isDelete: false },
                                        model: PermissionModel,
                                        attributes: []
                                    }],
                                    order: [[COL(table, 'sort'), 'ASC']],
                                    attributes: ['roleId', 'permissionId'].concat(Attrs(table, includes)),
                                    raw: true
                                });

                            case 14:
                                rows = _context9.sent;

                                //转为树形结构
                                list = listToTree(rows, 'parentId', 'permissionId', 0);
                                return _context9.abrupt('return', result.success(null, list));

                            case 19:
                                _context9.prev = 19;
                                _context9.t0 = _context9['catch'](4);

                                console.log(_context9.t0);
                                return _context9.abrupt('return', result.failed(_context9.t0));

                            case 23:
                            case 'end':
                                return _context9.stop();
                        }
                    }
                }, _callee9, this, [[4, 19]]);
            }));

            function getSysRoleMenusToTree(_x16) {
                return _ref23.apply(this, arguments);
            }

            return getSysRoleMenusToTree;
        }()
    }]);
    return _class;
}();