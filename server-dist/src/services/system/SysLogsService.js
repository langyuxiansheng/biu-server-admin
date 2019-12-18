'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

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
 * 系统日志管理
 */
var path = require('path');
var result = require(':lib/Result');

var _require = require(':lib/Utils'),
    SRC_PATH = _require.SRC_PATH;

var _require2 = require(':lib/FileUtils'),
    getLogsFileList = _require2.getLogsFileList,
    readerFile = _require2.readerFile,
    writeFile = _require2.writeFile;

module.exports = function () {
    function _class() {
        (0, _classCallCheck3.default)(this, _class);
    }

    (0, _createClass3.default)(_class, [{
        key: 'getSysLogList',

        /**
         * 获取系统日志列表
         * @param {*} param0
         */
        value: function () {
            var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_ref2) {
                var isAdmin = _ref2.isAdmin;
                var res;
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
                                _context.prev = 2;
                                _context.next = 5;
                                return getLogsFileList(path.join(SRC_PATH, '/logs'));

                            case 5:
                                res = _context.sent;
                                return _context.abrupt('return', result.success(null, { list: res }));

                            case 9:
                                _context.prev = 9;
                                _context.t0 = _context['catch'](2);

                                console.log(_context.t0);
                                return _context.abrupt('return', result.failed(_context.t0));

                            case 13:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[2, 9]]);
            }));

            function getSysLogList(_x) {
                return _ref.apply(this, arguments);
            }

            return getSysLogList;
        }()

        /**
         * 获取系统日志内容
         * @param {*} param0
         * @param {*} param1
         */

    }, {
        key: 'getSysLogContent',
        value: function () {
            var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(_ref4, _ref5) {
                var logPath = _ref4.logPath;
                var isAdmin = _ref5.isAdmin;

                var _ref6, code, data;

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
                                _context2.prev = 2;
                                _context2.next = 5;
                                return readerFile(path.join(SRC_PATH, logPath), 'utf-8');

                            case 5:
                                _ref6 = _context2.sent;
                                code = _ref6.code;
                                data = _ref6.data;

                                if (!(code == 200)) {
                                    _context2.next = 10;
                                    break;
                                }

                                return _context2.abrupt('return', result.success(null, data));

                            case 10:
                                return _context2.abrupt('return', result.failed('读取日志失败!'));

                            case 13:
                                _context2.prev = 13;
                                _context2.t0 = _context2['catch'](2);

                                console.log(_context2.t0);
                                return _context2.abrupt('return', result.failed(_context2.t0));

                            case 17:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this, [[2, 13]]);
            }));

            function getSysLogContent(_x2, _x3) {
                return _ref3.apply(this, arguments);
            }

            return getSysLogContent;
        }()

        /**
         * 删除系统日志内容
         * @param {*} param0
         * @description 只能清空内容不能直接删除文件,否则没释放资源的情况下会报错
         */

    }, {
        key: 'delSysLogByPaths',
        value: function () {
            var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(_ref8, _ref9) {
                var _this = this;

                var paths = _ref8.paths,
                    isDelete = _ref8.isDelete;
                var isAdmin = _ref9.isAdmin;
                var deleteFiles, delData;
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
                                if (!(!paths || !isDelete || !Array.isArray(paths))) {
                                    _context4.next = 4;
                                    break;
                                }

                                return _context4.abrupt('return', result.paramsLack());

                            case 4:
                                _context4.prev = 4;
                                deleteFiles = paths.map(function (logPath) {
                                    //批量删除
                                    return new _promise2.default(function () {
                                        var _ref10 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(resolve, reject) {
                                            var res;
                                            return _regenerator2.default.wrap(function _callee3$(_context3) {
                                                while (1) {
                                                    switch (_context3.prev = _context3.next) {
                                                        case 0:
                                                            _context3.prev = 0;
                                                            _context3.next = 3;
                                                            return writeFile(path.join(SRC_PATH, logPath), '');

                                                        case 3:
                                                            res = _context3.sent;
                                                            //上传成功后删除临时文件
                                                            if (res && res.code == 200) {
                                                                resolve(logPath);
                                                            } else {
                                                                reject(res);
                                                            }
                                                            _context3.next = 10;
                                                            break;

                                                        case 7:
                                                            _context3.prev = 7;
                                                            _context3.t0 = _context3['catch'](0);

                                                            reject(_context3.t0);

                                                        case 10:
                                                        case 'end':
                                                            return _context3.stop();
                                                    }
                                                }
                                            }, _callee3, _this, [[0, 7]]);
                                        }));

                                        return function (_x6, _x7) {
                                            return _ref10.apply(this, arguments);
                                        };
                                    }());
                                });
                                //返回删除文件的结果

                                _context4.next = 8;
                                return _promise2.default.all(deleteFiles);

                            case 8:
                                delData = _context4.sent;
                                return _context4.abrupt('return', result.success(null, { list: delData }));

                            case 12:
                                _context4.prev = 12;
                                _context4.t0 = _context4['catch'](4);

                                console.log(_context4.t0);
                                return _context4.abrupt('return', result.failed(_context4.t0));

                            case 16:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, this, [[4, 12]]);
            }));

            function delSysLogByPaths(_x4, _x5) {
                return _ref7.apply(this, arguments);
            }

            return delSysLogByPaths;
        }()
    }]);
    return _class;
}();