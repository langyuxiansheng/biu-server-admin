'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

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
var result = require(':lib/Result');
var config = require(':config/server.base.config'); //配置文件

var _require = require(':lib/Utils'),
    MODELS_PATH = _require.MODELS_PATH,
    getExtname = _require.getExtname,
    getTimeStampUUID = _require.getTimeStampUUID,
    getYearMonthDay = _require.getYearMonthDay;

var _require2 = require(':lib/sequelize'),
    MuHomeDB = _require2.MuHomeDB,
    SOP = _require2.SOP;

var FilesBaseModel = MuHomeDB.import(MODELS_PATH + '/common/FilesBaseModel');
module.exports = function () {
    function _class() {
        (0, _classCallCheck3.default)(this, _class);
    }

    (0, _createClass3.default)(_class, [{
        key: 'uploadFile',

        // constructor() {
        //     FilesBaseModel.sync().then((res) => {
        //         console.log(`FilesBaseModel 同步成功`, res);
        //     });
        // }

        /**
         * 单文件上传
         * @param {*} param0
         */
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
                                    _context.next = 7;
                                    break;
                                }

                                //只能上传单文件,需要删除临时文件
                                file.forEach(function (file) {
                                    fs.unlink(file.path, function (err) {
                                        //上传成功后删除临时文件
                                        if (err) {
                                            throw new Error('删除临时文件异常！');
                                        } else {
                                            console.log('\u6587\u4EF6: ' + file.path + ' \u5220\u9664\u6210\u529F\uFF01');
                                        }
                                    });
                                });
                                return _context.abrupt('return', result.failed('\u53EA\u80FD\u4E0A\u4F20\u5355\u6587\u4EF6!'));

                            case 7:
                                ;
                                //创建文件夹
                                time = getYearMonthDay(); //获取时间

                                uploadPath = path.join(config.staticPath, '/uploads/', time.replace(/-/g, '')); //文件上传存放路径

                                _context.next = 12;
                                return new _promise2.default(function (resolve, reject) {
                                    if (!fs.existsSync(uploadPath)) {
                                        //判断文件夹是否存在
                                        fs.mkdir(uploadPath, function (err) {
                                            if (err) {
                                                reject(new Error(err));
                                            } else {
                                                resolve(true);
                                            }
                                        });
                                    } else {
                                        resolve(true);
                                    }
                                });

                            case 12:
                                existsSync = _context.sent;

                                if (!existsSync) {
                                    _context.next = 20;
                                    break;
                                }

                                _context.next = 16;
                                return this.__filePromise(file, uploadPath, state.user.data);

                            case 16:
                                data = _context.sent;
                                _context.next = 19;
                                return FilesBaseModel.create(data);

                            case 19:
                                return _context.abrupt('return', result.success(null, data));

                            case 20:
                                return _context.abrupt('return', result.failed('\u4E0A\u4F20\u6587\u4EF6\u5F02\u5E38!'));

                            case 23:
                                _context.prev = 23;
                                _context.t0 = _context['catch'](3);

                                console.log(_context.t0);
                                return _context.abrupt('return', result.failed(_context.t0));

                            case 27:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[3, 23]]);
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
                var fileList, time, uploadPath, existsSync, saveFiles;
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

                                //创建文件夹
                                time = getYearMonthDay(); //获取时间

                                uploadPath = path.join(config.staticPath, '/uploads/', time.replace(/-/g, '')); //文件上传存放路径

                                _context2.next = 8;
                                return new _promise2.default(function (resolve, reject) {
                                    if (!fs.existsSync(uploadPath)) {
                                        //判断文件夹是否存在
                                        fs.mkdir(uploadPath, function (err) {
                                            if (err) {
                                                reject(new Error(err));
                                            } else {
                                                resolve(true);
                                            }
                                        });
                                    } else {
                                        resolve(true);
                                    }
                                });

                            case 8:
                                existsSync = _context2.sent;

                                if (!existsSync) {
                                    _context2.next = 17;
                                    break;
                                }

                                _context2.next = 12;
                                return _promise2.default.all(fileList.map(function (file) {
                                    return _this.__filePromise(file, uploadPath, state.user.data);
                                }));

                            case 12:
                                saveFiles = _context2.sent;
                                _context2.next = 15;
                                return FilesBaseModel.bulkCreate(saveFiles);

                            case 15:
                                console.log(saveFiles);
                                return _context2.abrupt('return', result.success(null, saveFiles));

                            case 17:
                                return _context2.abrupt('return', result.failed('\u4E0A\u4F20\u6587\u4EF6\u5F02\u5E38!'));

                            case 20:
                                _context2.prev = 20;
                                _context2.t0 = _context2['catch'](3);

                                console.log(_context2.t0);
                                return _context2.abrupt('return', result.failed('\u4E0A\u4F20\u6587\u4EF6\u51FA\u9519!'));

                            case 24:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this, [[3, 20]]);
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
                    var reader = fs.createReadStream(file.path); //创建可读文件流
                    var fileName = data.fileId + '.' + data.suffix; //重名名后的文件
                    var fileSavePath = path.join(uploadPath, fileName); //合成路径 + 时间 + 文件名
                    data.path = fileSavePath; //存储完整路径
                    data.aliasName = fileName; //存储别名
                    reader.pipe(fs.createWriteStream(fileSavePath)); //写入文件
                    reader.on('end', function () {
                        reader.close(); //关闭文件
                        fs.unlink(file.path, function (err) {
                            //上传成功后删除临时文件
                            if (err) {
                                reject(new Error('删除临时文件异常！'));
                            } else {
                                console.log('\u6587\u4EF6: ' + file.path + ' \u5220\u9664\u6210\u529F\uFF01');
                            }
                        });
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
            var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(_ref7) {
                var state = _ref7.state,
                    fileIds = _ref7.body.fileIds;

                var userId, files, _deleteFiles, delData;

                return _regenerator2.default.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                if (Array.isArray(fileIds)) {
                                    _context3.next = 2;
                                    break;
                                }

                                return _context3.abrupt('return', result.paramsLack());

                            case 2:
                                _context3.prev = 2;
                                userId = state.user.data.userId;
                                //查询相关文件

                                _context3.next = 6;
                                return FilesBaseModel.findAll({
                                    where: {
                                        userId: userId,
                                        fileId: (0, _defineProperty3.default)({}, SOP.in, fileIds)
                                        // isDelete: false
                                    }
                                });

                            case 6:
                                files = _context3.sent;

                                if (!(files && files.length)) {
                                    _context3.next = 15;
                                    break;
                                }

                                //获取数据库里的文件数据
                                _deleteFiles = files.map(function (file) {
                                    return new _promise2.default(function (resolve, reject) {
                                        fs.unlink(file.path, function (err) {
                                            //删除文件
                                            if (err) {
                                                reject(new Error('\u5220\u9664\u6587\u4EF6: ' + file.path + ' \u5F02\u5E38\uFF01'));
                                            } else {
                                                console.log('\u6587\u4EF6: ' + file.path + ' \u5220\u9664\u6210\u529F\uFF01');
                                                resolve(file);
                                            }
                                        });
                                    });
                                });

                                //返回删除文件的结果

                                _context3.next = 11;
                                return _promise2.default.all(_deleteFiles);

                            case 11:
                                delData = _context3.sent;
                                _context3.next = 14;
                                return FilesBaseModel.destroy({
                                    where: {
                                        userId: userId,
                                        fileId: delData.map(function (file) {
                                            return file.fileId;
                                        })
                                    }
                                });

                            case 14:
                                return _context3.abrupt('return', result.success(null, delData));

                            case 15:
                                return _context3.abrupt('return', result.success('\u672A\u53D1\u73B0\u9700\u8981\u5220\u9664\u7684\u6587\u4EF6!'));

                            case 18:
                                _context3.prev = 18;
                                _context3.t0 = _context3['catch'](2);

                                console.log(_context3.t0);
                                return _context3.abrupt('return', result.failed('\u5220\u9664\u6587\u4EF6\u51FA\u9519!'));

                            case 22:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this, [[2, 18]]);
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
            var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(_ref9) {
                var state = _ref9.state,
                    query = _ref9.query;

                var userId, keyword, page, limit, queryData, _ref10, rows, count;

                return _regenerator2.default.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                userId = state.user.data.userId;
                                keyword = query.keyword, page = query.page, limit = query.limit;
                                queryData = {
                                    where: { userId: userId, isDelete: false },
                                    order: [['createdTime', 'DESC']],
                                    attributes: { exclude: ['isDelete'] }
                                };

                                if (keyword) {
                                    queryData.where['fileName'] = (0, _defineProperty3.default)({}, SOP.like, '%' + keyword + '%');
                                }

                                if (page && limit) {
                                    //分页
                                    queryData.offset = Number((page - 1) * limit); //开始的数据索引
                                    queryData.limit = Number(limit); //每页限制返回的数据条数
                                };

                                _context4.prev = 6;
                                _context4.next = 9;
                                return FilesBaseModel.findAndCountAll(queryData);

                            case 9:
                                _ref10 = _context4.sent;
                                rows = _ref10.rows;
                                count = _ref10.count;
                                return _context4.abrupt('return', result.success(null, { list: rows, total: count }));

                            case 15:
                                _context4.prev = 15;
                                _context4.t0 = _context4['catch'](6);

                                console.log(_context4.t0);
                                return _context4.abrupt('return', result.failed(_context4.t0));

                            case 19:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, this, [[6, 15]]);
            }));

            function getFiles(_x4) {
                return _ref8.apply(this, arguments);
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
            var _ref11 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(_ref12) {
                var fileId = _ref12.fileId;
                var file;
                return _regenerator2.default.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                if (fileId) {
                                    _context5.next = 2;
                                    break;
                                }

                                return _context5.abrupt('return', result.paramsLack());

                            case 2:
                                _context5.prev = 2;
                                _context5.next = 5;
                                return FilesBaseModel.findOne({
                                    where: { fileId: fileId, isDelete: false },
                                    attributes: ['fileId', 'path', 'fileName']
                                });

                            case 5:
                                file = _context5.sent;
                                return _context5.abrupt('return', result.success(null, file));

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

            function getFileById(_x5) {
                return _ref11.apply(this, arguments);
            }

            return getFileById;
        }()
    }]);
    return _class;
}();