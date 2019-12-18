'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

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
 * 文件服务类
 */
var fs = require('fs');
var path = require('path');
var crypto = require('crypto');
var result = require(':lib/Result');
var config = require(':config/server.base.config'); //配置文件

var _require = require(':lib/Utils'),
    MODELS_PATH = _require.MODELS_PATH,
    SRC_PATH = _require.SRC_PATH,
    getExtname = _require.getExtname,
    getTimeStampUUID = _require.getTimeStampUUID,
    getYearMonthDay = _require.getYearMonthDay,
    getFileNameUUID32 = _require.getFileNameUUID32;

var _require2 = require(':lib/FileUtils'),
    isDirExists = _require2.isDirExists,
    deleteFile = _require2.deleteFile,
    readerFile = _require2.readerFile;

var _require3 = require(':lib/sequelize'),
    BiuDB = _require3.BiuDB,
    SOP = _require3.SOP;

var Email = require(':lib/Email');
var FilesBaseModel = BiuDB.import(MODELS_PATH + '/common/FilesBaseModel');
module.exports = function () {
    function _class() {
        (0, _classCallCheck3.default)(this, _class);

        console.log(Email);
        FilesBaseModel.sync().then(function (res) {
            console.log('FilesBaseModel \u540C\u6B65\u6210\u529F', res);
        });
    }

    /**
     * 单文件上传
     * @param {*} param0
     */


    (0, _createClass3.default)(_class, [{
        key: 'uploadFile',
        value: function () {
            var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_ref2) {
                var state = _ref2.state,
                    files = _ref2.files;
                var file, time, uploadPath, existsSync, data;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                file = files.file; //文件

                                if (file) {
                                    _context.next = 3;
                                    break;
                                }

                                return _context.abrupt('return', result.failed('\u672A\u53D1\u73B0\u4E0A\u4F20\u6587\u4EF6!'));

                            case 3:
                                _context.prev = 3;

                                if (!Array.isArray(file)) {
                                    _context.next = 9;
                                    break;
                                }

                                //只能上传单文件,需要删除临时文件
                                file.forEach(function (file) {
                                    deleteFile(file.path); //上传成功后删除临时文件
                                });
                                return _context.abrupt('return', result.failed('\u53EA\u80FD\u4E0A\u4F20\u5355\u6587\u4EF6!'));

                            case 9:
                                if (!(file.size / 1024 / 1024 < 200)) {
                                    _context.next = 11;
                                    break;
                                }

                                return _context.abrupt('return', result.failed('\u4E0A\u4F20\u6587\u4EF6\u4E0D\u80FD\u8D85\u8FC7200M!'));

                            case 11:
                                //创建文件夹
                                time = getYearMonthDay(); //获取时间

                                uploadPath = path.join(config.staticPath, '/uploads/', time.replace(/-/g, '')); //文件上传存放路径

                                _context.next = 15;
                                return isDirExists(uploadPath, true);

                            case 15:
                                existsSync = _context.sent;

                                if (!existsSync) {
                                    _context.next = 23;
                                    break;
                                }

                                _context.next = 19;
                                return this.__filePromise(file, uploadPath, state.user.data);

                            case 19:
                                data = _context.sent;
                                _context.next = 22;
                                return FilesBaseModel.create(data);

                            case 22:
                                return _context.abrupt('return', result.success(null, data));

                            case 23:
                                return _context.abrupt('return', result.failed('\u4E0A\u4F20\u6587\u4EF6\u5F02\u5E38!'));

                            case 26:
                                _context.prev = 26;
                                _context.t0 = _context['catch'](3);

                                console.log(_context.t0);
                                return _context.abrupt('return', result.failed(_context.t0));

                            case 30:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[3, 26]]);
            }));

            function uploadFile(_x) {
                return _ref.apply(this, arguments);
            }

            return uploadFile;
        }()

        /**
         * 多文件上传
         * @param {*} param0
         */

    }, {
        key: 'uploadFiles',
        value: function () {
            var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(_ref4) {
                var _this = this;

                var state = _ref4.state,
                    files = _ref4.files;
                var fileList, maxSize, time, uploadPath, existsSync, saveFiles;
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                if (files.file) {
                                    _context2.next = 2;
                                    break;
                                }

                                return _context2.abrupt('return', result.failed('\u672A\u53D1\u73B0\u4E0A\u4F20\u6587\u4EF6!'));

                            case 2:
                                //兼容单文件上传
                                fileList = Array.isArray(files.file) ? files.file : [files.file];
                                _context2.prev = 3;
                                maxSize = fileList.map(function (item) {
                                    return item.size;
                                }).reduce(function (a, b) {
                                    return a + b;
                                }, 0);

                                if (!(maxSize / 1024 / 1024 < 200)) {
                                    _context2.next = 8;
                                    break;
                                }

                                //单位是M
                                fileList.forEach(function (file) {
                                    deleteFile(file.path); //上传成功后删除临时文件
                                });
                                return _context2.abrupt('return', result.failed('\u6279\u91CF\u4E0A\u4F20\u6587\u4EF6\u603B\u5927\u5C0F\u4E0D\u80FD\u8D85\u8FC7200M!'));

                            case 8:

                                //创建文件夹
                                time = getYearMonthDay(); //获取时间

                                uploadPath = path.join(config.staticPath, '/uploads/', time.replace(/-/g, '')); //文件上传存放路径

                                _context2.next = 12;
                                return isDirExists(uploadPath, true);

                            case 12:
                                existsSync = _context2.sent;

                                if (!existsSync) {
                                    _context2.next = 21;
                                    break;
                                }

                                _context2.next = 16;
                                return _promise2.default.all(fileList.map(function (file) {
                                    return _this.__filePromise(file, uploadPath, state.user.data);
                                }));

                            case 16:
                                saveFiles = _context2.sent;
                                _context2.next = 19;
                                return FilesBaseModel.bulkCreate(saveFiles);

                            case 19:
                                console.log(saveFiles);
                                return _context2.abrupt('return', result.success(null, saveFiles));

                            case 21:
                                return _context2.abrupt('return', result.failed('\u4E0A\u4F20\u6587\u4EF6\u5F02\u5E38!'));

                            case 24:
                                _context2.prev = 24;
                                _context2.t0 = _context2['catch'](3);

                                console.log(_context2.t0);
                                return _context2.abrupt('return', result.failed('\u4E0A\u4F20\u6587\u4EF6\u51FA\u9519!'));

                            case 28:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this, [[3, 24]]);
            }));

            function uploadFiles(_x2) {
                return _ref3.apply(this, arguments);
            }

            return uploadFiles;
        }()

        /**
         * 异步上传文件
         * @param {*} file
         */

    }, {
        key: '__filePromise',
        value: function __filePromise(file, uploadPath, _ref5) {
            var userId = _ref5.userId,
                userName = _ref5.userName;

            return new _promise2.default(function (resolve, reject) {
                //异常上传,同步获取
                var md5sum = crypto.createHash('md5'); //创建文件指纹读取对象
                var name = file.name,
                    size = file.size,
                    type = file.type;
                //创建数据库存储数据

                var data = {
                    userId: userId, //上传者id
                    userName: userName, //上传者名称
                    fileId: getTimeStampUUID(),
                    size: size, //文件大小
                    type: type, //文件类型
                    fileName: name, //获取原文件名
                    suffix: getExtname(name), //获取文件后缀名
                    path: null, //文件路径
                    aliasName: null, //文件别名
                    remark: null //源文件路径
                };
                try {
                    console.log('\u6B63\u5728\u4E0A\u4F20' + name);
                    var reader = fs.createReadStream(file.path); //创建可读文件流
                    var fileName = getFileNameUUID32(data.suffix); //重名名后的文件
                    var fileSavePath = path.join(uploadPath, fileName); //合成路径 + 时间 + 文件名
                    data.path = fileSavePath.split('public')[1]; //存储完整路径
                    data.aliasName = fileName; //存储别名
                    reader.pipe(fs.createWriteStream(fileSavePath)); //写入文件
                    reader.on('data', function (chunk) {
                        md5sum.update(chunk);
                    }); //读取文件流
                    reader.on('end', function () {
                        data.fileMD5 = md5sum.digest('hex').toUpperCase();
                        console.log('fileMD5:', data.fileMD5);
                        reader.close(); //关闭文件
                        deleteFile(file.path); //上传成功后删除临时文件
                        console.log('\u6587\u4EF6:' + name + ' \u4E0A\u4F20\u6210\u529F!');
                        resolve(data);
                    });
                    reader.on('error', function (err) {
                        reject(err);
                    });
                } catch (error) {
                    console.log(error);
                    reject(error);
                }
            });
        }

        /**
         * 批量删除文件
         * @param {*} param0
         */

    }, {
        key: 'deleteFiles',
        value: function () {
            var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(_ref7) {
                var _this2 = this;

                var state = _ref7.state,
                    ids = _ref7.body.ids;

                var _state$user$data, userId, isAdmin, roleName, queryData, files, _deleteFiles, delData;

                return _regenerator2.default.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                if (Array.isArray(ids)) {
                                    _context4.next = 2;
                                    break;
                                }

                                return _context4.abrupt('return', result.paramsLack());

                            case 2:
                                _context4.prev = 2;
                                _state$user$data = state.user.data, userId = _state$user$data.userId, isAdmin = _state$user$data.isAdmin, roleName = _state$user$data.roleName;
                                queryData = {
                                    where: {
                                        userId: userId,
                                        fileId: (0, _defineProperty3.default)({}, SOP.in, ids),
                                        isDelete: false
                                    }
                                };

                                if (isAdmin && roleName === '超级管理员') {
                                    //超级管理员会获取所有的文件
                                    delete queryData.where['userId'];
                                    delete queryData.where['isDelete'];
                                }
                                //查询相关文件
                                _context4.next = 8;
                                return FilesBaseModel.findAll(queryData);

                            case 8:
                                files = _context4.sent;

                                if (!(files && files.length)) {
                                    _context4.next = 21;
                                    break;
                                }

                                if (!(isAdmin && roleName === '超级管理员')) {
                                    _context4.next = 18;
                                    break;
                                }

                                //只有超级管理员才能真正的删除文件,普通用户为软删除
                                _deleteFiles = files.map(function (file) {
                                    return new _promise2.default(function () {
                                        var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(resolve, reject) {
                                            var res;
                                            return _regenerator2.default.wrap(function _callee3$(_context3) {
                                                while (1) {
                                                    switch (_context3.prev = _context3.next) {
                                                        case 0:
                                                            _context3.prev = 0;
                                                            _context3.next = 3;
                                                            return deleteFile(path.join(config.staticPath, file.path));

                                                        case 3:
                                                            res = _context3.sent;

                                                            if (!(res && res.code == 200)) {
                                                                _context3.next = 10;
                                                                break;
                                                            }

                                                            _context3.next = 7;
                                                            return FilesBaseModel.destroy({ where: { fileId: file.fileId } });

                                                        case 7:
                                                            resolve(file);
                                                            _context3.next = 11;
                                                            break;

                                                        case 10:
                                                            reject(res);

                                                        case 11:
                                                            _context3.next = 16;
                                                            break;

                                                        case 13:
                                                            _context3.prev = 13;
                                                            _context3.t0 = _context3['catch'](0);

                                                            reject(_context3.t0);

                                                        case 16:
                                                        case 'end':
                                                            return _context3.stop();
                                                    }
                                                }
                                            }, _callee3, _this2, [[0, 13]]);
                                        }));

                                        return function (_x4, _x5) {
                                            return _ref8.apply(this, arguments);
                                        };
                                    }());
                                });
                                //返回删除文件的结果

                                _context4.next = 14;
                                return _promise2.default.all(_deleteFiles);

                            case 14:
                                delData = _context4.sent;
                                return _context4.abrupt('return', result.success(null, delData));

                            case 18:
                                _context4.next = 20;
                                return FilesBaseModel.update({ isDelete: true }, { where: { fileId: ids } });

                            case 20:
                                return _context4.abrupt('return', result.success(null));

                            case 21:
                                return _context4.abrupt('return', result.success('\u672A\u53D1\u73B0\u9700\u8981\u5220\u9664\u7684\u6587\u4EF6!'));

                            case 24:
                                _context4.prev = 24;
                                _context4.t0 = _context4['catch'](2);

                                console.log(_context4.t0);
                                return _context4.abrupt('return', result.failed('\u5220\u9664\u90E8\u5206\u6587\u4EF6\u51FA\u9519!'));

                            case 28:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, this, [[2, 24]]);
            }));

            function deleteFiles(_x3) {
                return _ref6.apply(this, arguments);
            }

            return deleteFiles;
        }()

        /**
         * 获取文件列表
         * @param {*} param0
         */

    }, {
        key: 'getFiles',
        value: function () {
            var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(_ref10) {
                var state = _ref10.state,
                    query = _ref10.query;

                var _state$user$data2, userId, isAdmin, roleName, keyword, isDelete, page, limit, queryData, _ref11, rows, count;

                return _regenerator2.default.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                _state$user$data2 = state.user.data, userId = _state$user$data2.userId, isAdmin = _state$user$data2.isAdmin, roleName = _state$user$data2.roleName;
                                keyword = query.keyword, isDelete = query.isDelete, page = query.page, limit = query.limit;
                                queryData = {
                                    where: { userId: userId, isDelete: false },
                                    order: [['createdTime', 'DESC']]
                                    // attributes: { exclude: ['isDelete'] }
                                };

                                if (isAdmin && roleName === '超级管理员') {
                                    delete queryData.where['userId']; //超级管理员会获取所有的文件
                                    delete queryData.where['isDelete'];
                                }
                                if (keyword) {
                                    queryData.where['fileName'] = (0, _defineProperty3.default)({}, SOP.like, '%' + keyword + '%');
                                }

                                if (isDelete != undefined || isDelete != null) {
                                    console.log(isDelete);
                                    queryData.where['isDelete'] = isDelete != 0;
                                }

                                if (page && limit) {
                                    //分页
                                    queryData.offset = Number((page - 1) * limit); //开始的数据索引
                                    queryData.limit = Number(limit); //每页限制返回的数据条数
                                };

                                _context5.prev = 8;
                                _context5.next = 11;
                                return FilesBaseModel.findAndCountAll(queryData);

                            case 11:
                                _ref11 = _context5.sent;
                                rows = _ref11.rows;
                                count = _ref11.count;
                                return _context5.abrupt('return', result.success(null, { list: rows, total: count }));

                            case 17:
                                _context5.prev = 17;
                                _context5.t0 = _context5['catch'](8);

                                console.log(_context5.t0);
                                return _context5.abrupt('return', result.failed(_context5.t0));

                            case 21:
                            case 'end':
                                return _context5.stop();
                        }
                    }
                }, _callee5, this, [[8, 17]]);
            }));

            function getFiles(_x6) {
                return _ref9.apply(this, arguments);
            }

            return getFiles;
        }()

        /**
         * 获取文件详情
         * @param {*} param0
         */

    }, {
        key: 'getFileById',
        value: function () {
            var _ref12 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(_ref13) {
                var fileId = _ref13.fileId;
                var file;
                return _regenerator2.default.wrap(function _callee6$(_context6) {
                    while (1) {
                        switch (_context6.prev = _context6.next) {
                            case 0:
                                if (fileId) {
                                    _context6.next = 2;
                                    break;
                                }

                                return _context6.abrupt('return', result.paramsLack());

                            case 2:
                                _context6.prev = 2;
                                _context6.next = 5;
                                return FilesBaseModel.findOne({
                                    where: { fileId: fileId, isDelete: false },
                                    attributes: ['fileId', 'path', 'fileName']
                                });

                            case 5:
                                file = _context6.sent;
                                return _context6.abrupt('return', result.success(null, file));

                            case 9:
                                _context6.prev = 9;
                                _context6.t0 = _context6['catch'](2);

                                console.log(_context6.t0);
                                return _context6.abrupt('return', result.failed(_context6.t0));

                            case 13:
                            case 'end':
                                return _context6.stop();
                        }
                    }
                }, _callee6, this, [[2, 9]]);
            }));

            function getFileById(_x7) {
                return _ref12.apply(this, arguments);
            }

            return getFileById;
        }()

        /**
         * 读取文件内容
         * @param {*} param0
         */

    }, {
        key: 'readeFileContent',
        value: function () {
            var _ref14 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(_ref15) {
                var filePath = _ref15.filePath;

                var _ref16, code, data;

                return _regenerator2.default.wrap(function _callee7$(_context7) {
                    while (1) {
                        switch (_context7.prev = _context7.next) {
                            case 0:
                                if (filePath) {
                                    _context7.next = 2;
                                    break;
                                }

                                return _context7.abrupt('return', result.paramsLack());

                            case 2:
                                _context7.prev = 2;
                                _context7.next = 5;
                                return readerFile(path.join(SRC_PATH, '/public', filePath), 'utf-8');

                            case 5:
                                _ref16 = _context7.sent;
                                code = _ref16.code;
                                data = _ref16.data;

                                if (!(code == 200)) {
                                    _context7.next = 10;
                                    break;
                                }

                                return _context7.abrupt('return', result.success(null, data));

                            case 10:
                                return _context7.abrupt('return', result.failed('读取文件失败!'));

                            case 13:
                                _context7.prev = 13;
                                _context7.t0 = _context7['catch'](2);

                                console.log(_context7.t0);
                                return _context7.abrupt('return', result.failed(_context7.t0));

                            case 17:
                            case 'end':
                                return _context7.stop();
                        }
                    }
                }, _callee7, this, [[2, 13]]);
            }));

            function readeFileContent(_x8) {
                return _ref14.apply(this, arguments);
            }

            return readeFileContent;
        }()
    }]);
    return _class;
}();