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

var SysPermissionModel = BiuDB.import(MODELS_PATH + '/system/SysPermissionModel');
var SysRolesAuthModel = BiuDB.import(MODELS_PATH + '/system/SysRolesAuthModel');
module.exports = function () {
    function _class() {
        (0, _classCallCheck3.default)(this, _class);
    }

    (0, _createClass3.default)(_class, [{
        key: 'addSysPermission',

        // constructor() {
        //     // SysPermissionModel.sync().then((res) => {
        //     //     console.log(`SysPermissionModel 同步成功`, res);
        //     // });
        //     // SysRolesAuthModel.sync().then((res) => {
        //     //     console.log(`SysRolesAuthModel 同步成功`, res);
        //     // });
        // }

        /**
         * 添加系统权限菜单
         * @param {*} user
         */
        value: function () {
            var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(data) {
                var title, path, name, count;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                title = data.title, path = data.path, name = data.name;

                                if (!(!title || !path || !name)) {
                                    _context.next = 3;
                                    break;
                                }

                                return _context.abrupt('return', result.paramsLack());

                            case 3:
                                _context.prev = 3;
                                _context.next = 6;
                                return SysPermissionModel.count({
                                    where: { title: title, path: path, isDelete: false }
                                });

                            case 6:
                                count = _context.sent;

                                if (!(count > 0)) {
                                    _context.next = 9;
                                    break;
                                }

                                return _context.abrupt('return', result.failed('菜单已存在!'));

                            case 9:
                                _context.next = 11;
                                return SysPermissionModel.create(data);

                            case 11:
                                return _context.abrupt('return', result.success());

                            case 14:
                                _context.prev = 14;
                                _context.t0 = _context['catch'](3);

                                console.log(_context.t0);
                                return _context.abrupt('return', result.failed(_context.t0));

                            case 18:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[3, 14]]);
            }));

            function addSysPermission(_x) {
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
            var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(_ref3) {
                var title = _ref3.title,
                    page = _ref3.page,
                    limit = _ref3.limit;

                var queryData, _ref4, rows, count;

                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
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
                                _context2.prev = 4;
                                _context2.next = 7;
                                return SysPermissionModel.findAndCountAll(queryData);

                            case 7:
                                _ref4 = _context2.sent;
                                rows = _ref4.rows;
                                count = _ref4.count;
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

            function getSysPermissionList(_x2) {
                return _ref2.apply(this, arguments);
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
            var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(_ref6) {
                var ids = _ref6.ids,
                    isDelete = _ref6.isDelete;
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
                                del = {
                                    where: (0, _defineProperty3.default)({}, SOP.or, [{ permissionId: ids }, { parentId: ids }])
                                };
                                _context3.next = 6;
                                return SysPermissionModel.update({ isDelete: isDelete }, del);

                            case 6:
                                //从中间表删除对应的权限
                                SysRolesAuthModel.destroy({
                                    where: (0, _defineProperty3.default)({}, SOP.or, [{ permissionId: ids }, { parentId: ids }])
                                });
                                return _context3.abrupt('return', result.success());

                            case 10:
                                _context3.prev = 10;
                                _context3.t0 = _context3['catch'](2);

                                console.log(_context3.t0);
                                return _context3.abrupt('return', result.failed(_context3.t0));

                            case 14:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this, [[2, 10]]);
            }));

            function delSysPermissionByIds(_x3) {
                return _ref5.apply(this, arguments);
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
            var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(data) {
                return _regenerator2.default.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                if (data.permissionId) {
                                    _context4.next = 2;
                                    break;
                                }

                                return _context4.abrupt('return', result.paramsLack());

                            case 2:
                                _context4.prev = 2;
                                _context4.next = 5;
                                return SysPermissionModel.update(data, { where: { permissionId: data.permissionId } });

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

            function updateSysPermission(_x4) {
                return _ref7.apply(this, arguments);
            }

            return updateSysPermission;
        }()

        /**
         * 获取树状菜单
         * @param {*} param0
         */

    }, {
        key: 'getSysPermissionListToTree',
        value: function () {
            var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(_ref9) {
                var title = _ref9.title,
                    page = _ref9.page,
                    limit = _ref9.limit;

                var queryData, _ref10, rows, count, list;

                return _regenerator2.default.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                queryData = {
                                    where: { isDelete: false },
                                    order: [
                                    // ['createdTime', 'DESC'],
                                    ['sort', 'ASC']],
                                    attributes: ['permissionId', 'parentId', 'title', 'path', 'find', 'add', 'edit', 'del', 'list']
                                };

                                if (title) {
                                    queryData.where['title'] = (0, _defineProperty3.default)({}, SOP.like, '%' + title + '%');
                                }
                                //分页
                                if (page && limit) {
                                    queryData.offset = Number((page - 1) * limit); //开始的数据索引
                                    queryData.limit = Number(limit); //每页限制返回的数据条数
                                };
                                _context5.prev = 4;
                                _context5.next = 7;
                                return SysPermissionModel.findAndCountAll(queryData);

                            case 7:
                                _ref10 = _context5.sent;
                                rows = _ref10.rows;
                                count = _ref10.count;
                                list = listToTree(rows, 'parentId', 'permissionId', 0);
                                return _context5.abrupt('return', result.success(null, { list: list, total: count }));

                            case 14:
                                _context5.prev = 14;
                                _context5.t0 = _context5['catch'](4);

                                console.log(_context5.t0);
                                return _context5.abrupt('return', result.failed(_context5.t0));

                            case 18:
                            case 'end':
                                return _context5.stop();
                        }
                    }
                }, _callee5, this, [[4, 14]]);
            }));

            function getSysPermissionListToTree(_x5) {
                return _ref8.apply(this, arguments);
            }

            return getSysPermissionListToTree;
        }()

        /**
         * 获取角色的权限
         * @param {*} param0
         */

    }, {
        key: 'getSysRolePermissionListToTree',
        value: function () {
            var _ref11 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(_ref12) {
                var roleId = _ref12.roleId,
                    title = _ref12.title,
                    page = _ref12.page,
                    limit = _ref12.limit;

                var queryData, queryAuth, _ref13, rows, count, auths, _list, list;

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
                                queryData = {
                                    where: { isDelete: false },
                                    order: [
                                    // ['createdTime', 'DESC'],
                                    ['sort', 'ASC']],
                                    attributes: ['permissionId', 'parentId', 'title', 'path', 'find', 'add', 'edit', 'del', 'list']
                                };

                                if (title) {
                                    queryData.where['title'] = (0, _defineProperty3.default)({}, SOP.like, '%' + title + '%');
                                }
                                //查询中间表
                                queryAuth = {
                                    where: { roleId: roleId },
                                    attributes: { exclude: ['createdTime', 'updatedTime'] }
                                };

                                //分页

                                if (page && limit) {
                                    queryData.offset = Number((page - 1) * limit); //开始的数据索引
                                    queryData.limit = Number(limit); //每页限制返回的数据条数
                                };
                                _context6.prev = 7;
                                _context6.next = 10;
                                return SysPermissionModel.findAndCountAll(queryData);

                            case 10:
                                _ref13 = _context6.sent;
                                rows = _ref13.rows;
                                count = _ref13.count;
                                _context6.next = 15;
                                return SysRolesAuthModel.findAll(queryAuth);

                            case 15:
                                auths = _context6.sent;

                                if (!(auths && auths.length)) {
                                    _context6.next = 19;
                                    break;
                                }

                                _list = rows.map(function (item) {
                                    auths.forEach(function (auth) {
                                        if (auth.permissionId === item.permissionId) {
                                            item.find = auth.find;
                                            item.add = auth.add;
                                            item.edit = auth.edit;
                                            item.del = auth.del;
                                            item.list = auth.list;
                                        }
                                    });
                                    return item;
                                });
                                //转为树形结构

                                return _context6.abrupt('return', result.success(null, { list: listToTree(_list, 'parentId', 'permissionId', 0), total: count }));

                            case 19:
                                //转为树形结构
                                list = listToTree(rows, 'parentId', 'permissionId', 0);
                                return _context6.abrupt('return', result.success(null, { list: list, total: count }));

                            case 23:
                                _context6.prev = 23;
                                _context6.t0 = _context6['catch'](7);

                                console.log(_context6.t0);
                                return _context6.abrupt('return', result.failed(_context6.t0));

                            case 27:
                            case 'end':
                                return _context6.stop();
                        }
                    }
                }, _callee6, this, [[7, 23]]);
            }));

            function getSysRolePermissionListToTree(_x6) {
                return _ref11.apply(this, arguments);
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
            var _ref14 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(data) {
                var list, roleId, records, ids;
                return _regenerator2.default.wrap(function _callee7$(_context7) {
                    while (1) {
                        switch (_context7.prev = _context7.next) {
                            case 0:
                                if (!(!data.roleId || !Array.isArray(data.list))) {
                                    _context7.next = 2;
                                    break;
                                }

                                return _context7.abrupt('return', result.paramsLack());

                            case 2:
                                list = data.list, roleId = data.roleId;
                                _context7.prev = 3;

                                //插入多条记录
                                records = list.map(function (item) {
                                    item.roleId = roleId;
                                    if (item.parentId == 0) delete item['parentId'];
                                    return item;
                                });
                                ids = list.map(function (item) {
                                    return item.permissionId;
                                });

                                console.log('records', records);
                                //先清除
                                _context7.next = 9;
                                return SysRolesAuthModel.destroy({ where: { roleId: roleId, permissionId: ids } });

                            case 9:
                                _context7.next = 11;
                                return SysRolesAuthModel.bulkCreate(records);

                            case 11:
                                return _context7.abrupt('return', result.success());

                            case 14:
                                _context7.prev = 14;
                                _context7.t0 = _context7['catch'](3);

                                console.log(_context7.t0);
                                return _context7.abrupt('return', result.failed(_context7.t0));

                            case 18:
                            case 'end':
                                return _context7.stop();
                        }
                    }
                }, _callee7, this, [[3, 14]]);
            }));

            function setSysRolePermission(_x7) {
                return _ref14.apply(this, arguments);
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
            var _ref15 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8(_ref16) {
                var roleId = _ref16.roleId;
                return _regenerator2.default.wrap(function _callee8$(_context8) {
                    while (1) {
                        switch (_context8.prev = _context8.next) {
                            case 0:
                                if (roleId) {
                                    _context8.next = 2;
                                    break;
                                }

                                return _context8.abrupt('return', result.paramsLack());

                            case 2:
                                _context8.prev = 2;
                                _context8.next = 5;
                                return SysRolesAuthModel.destroy({ where: { roleId: roleId } });

                            case 5:
                                return _context8.abrupt('return', result.success());

                            case 8:
                                _context8.prev = 8;
                                _context8.t0 = _context8['catch'](2);

                                console.log(_context8.t0);
                                return _context8.abrupt('return', result.failed(_context8.t0));

                            case 12:
                            case 'end':
                                return _context8.stop();
                        }
                    }
                }, _callee8, this, [[2, 8]]);
            }));

            function clearSysRoleAllPermission(_x8) {
                return _ref15.apply(this, arguments);
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
            var _ref17 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9(_ref18) {
                var roleId = _ref18.roleId,
                    isAdmin = _ref18.isAdmin;

                var table, includes, queryData, queryAdmin, _rows, arr, _list2, rows, list;

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
                                table = SysPermissionModel.getTableName();
                                includes = ['title', 'path', 'name', 'icon', 'sort', 'remark', 'parentId'];
                                //查询中间表

                                queryData = {
                                    where: { roleId: roleId },
                                    include: [{
                                        where: { isDelete: false },
                                        model: SysPermissionModel,
                                        attributes: []
                                    }],
                                    order: [[COL(table, 'sort'), 'ASC']],
                                    attributes: ['roleId', 'permissionId', 'find', 'add', 'edit', 'del', 'list'].concat(Attrs(table, includes)),
                                    raw: true
                                };

                                //超级管理员

                                queryAdmin = {
                                    where: { isDelete: false },
                                    order: [['sort', 'ASC']],
                                    attributes: ['permissionId', 'find', 'add', 'edit', 'del', 'list'].concat(includes)
                                };
                                _context9.prev = 6;

                                if (!isAdmin) {
                                    _context9.next = 14;
                                    break;
                                }

                                _context9.next = 10;
                                return SysPermissionModel.findAll(queryAdmin);

                            case 10:
                                _rows = _context9.sent;
                                arr = _rows.map(function (item) {
                                    //所有的权限
                                    item.find = 1;
                                    item.add = 1;
                                    item.edit = 1;
                                    item.del = 1;
                                    item.list = 1;
                                    return item;
                                });
                                //转为树形结构

                                _list2 = listToTree(arr, 'parentId', 'permissionId', 0);
                                return _context9.abrupt('return', result.success(null, _list2));

                            case 14:
                                //建立表关联
                                SysRolesAuthModel.belongsTo(SysPermissionModel, { foreignKey: 'permissionId' });
                                _context9.next = 17;
                                return SysRolesAuthModel.findAll(queryData);

                            case 17:
                                rows = _context9.sent;

                                //转为树形结构
                                list = listToTree(rows, 'parentId', 'permissionId', 0);
                                return _context9.abrupt('return', result.success(null, list));

                            case 22:
                                _context9.prev = 22;
                                _context9.t0 = _context9['catch'](6);

                                console.log(_context9.t0);
                                return _context9.abrupt('return', result.failed(_context9.t0));

                            case 26:
                            case 'end':
                                return _context9.stop();
                        }
                    }
                }, _callee9, this, [[6, 22]]);
            }));

            function getSysRoleMenusToTree(_x9) {
                return _ref17.apply(this, arguments);
            }

            return getSysRoleMenusToTree;
        }()
    }]);
    return _class;
}();