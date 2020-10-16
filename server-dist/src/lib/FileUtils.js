'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = require('fs');
// 图片文件夹路径
var path = require('path');
var request = require('request');

var _require = require(':lib/Utils'),
    SRC_PATH = _require.SRC_PATH,
    getFileNameUUID32 = _require.getFileNameUUID32;

var userAgents = require(':lib/userAgents');
/**
 * 文件操作工具类
 */
var FileUtils = {

    /**
     * 下载图片到本地且返回地址
     * @param {*} imageUrl
     * @param {*} encoding
     */
    downloadImageToLocal: function downloadImageToLocal(_ref) {
        var _this = this;

        var imageUrl = _ref.imageUrl,
            encoding = _ref.encoding,
            mkdirName = _ref.mkdirName,
            proxyIP = _ref.proxyIP;
        return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
            return _regenerator2.default.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            console.log('\u6B63\u5728\u4E0B\u8F7D:' + imageUrl + ',\u4EE3\u7406IP\u4E3A: ' + proxyIP);
                            return _context2.abrupt('return', new _promise2.default(function () {
                                var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(resolve, reject) {
                                    var headers, options;
                                    return _regenerator2.default.wrap(function _callee$(_context) {
                                        while (1) {
                                            switch (_context.prev = _context.next) {
                                                case 0:
                                                    try {
                                                        headers = { 'User-Agent': userAgents };
                                                        options = { pool: false, proxy: proxyIP, headers: headers };

                                                        request.head(imageUrl, options, function (err, res) {
                                                            if (res) {
                                                                var ext = imageUrl.split('.').pop(); //获取文件扩展名
                                                                var filepath = SRC_PATH + '/public/images'; //保存到书城图片专用文件夹
                                                                var imgDir = path.join(filepath, mkdirName); //保存到哪里去
                                                                var filename = getFileNameUUID32(ext); //获取文件名
                                                                request(imageUrl, options).on('response', function () {
                                                                    // 再次发起请求，写文件
                                                                    console.log('\u5DF2\u4E0B\u8F7D\u6587\u4EF6:' + imgDir + '/' + filename);
                                                                    resolve({ filename: filename, status: 200 });
                                                                }).pipe(fs.createWriteStream(path.join(imgDir, filename), {
                                                                    'encoding': encoding || 'utf8'
                                                                }));
                                                            } else {
                                                                console.log('\u5931\u8D25\uFF1A\u4E0B\u8F7D\u56FE\u7247=>' + imageUrl);
                                                                reject(new Error({ status: 400, msg: err }));
                                                            }
                                                        });
                                                    } catch (error) {
                                                        reject(new Error({ status: 400, msg: error }));
                                                    }

                                                case 1:
                                                case 'end':
                                                    return _context.stop();
                                            }
                                        }
                                    }, _callee, _this);
                                }));

                                return function (_x, _x2) {
                                    return _ref2.apply(this, arguments);
                                };
                            }()));

                        case 2:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, _this);
        }))();
    },


    /**
     * 获取日志文件列表
     * @param {*} filePath
     */
    getLogsFileList: function getLogsFileList(logsPath) {
        var _this2 = this;

        return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5() {
            return _regenerator2.default.wrap(function _callee5$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                        case 0:
                            return _context5.abrupt('return', new _promise2.default(function () {
                                var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(resolve, reject) {
                                    var filePaths, files;
                                    return _regenerator2.default.wrap(function _callee4$(_context4) {
                                        while (1) {
                                            switch (_context4.prev = _context4.next) {
                                                case 0:
                                                    _context4.prev = 0;
                                                    _context4.next = 3;
                                                    return FileUtils.readdir(logsPath);

                                                case 3:
                                                    filePaths = _context4.sent;
                                                    _context4.next = 6;
                                                    return _promise2.default.all(filePaths.map(function () {
                                                        var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(filePath) {
                                                            var filedir, logs, file, logdir, stat, subPath, name;
                                                            return _regenerator2.default.wrap(function _callee3$(_context3) {
                                                                while (1) {
                                                                    switch (_context3.prev = _context3.next) {
                                                                        case 0:
                                                                            //获取当前日志文件的文件夹绝对路径
                                                                            filedir = path.join(logsPath, filePath);
                                                                            _context3.next = 3;
                                                                            return FileUtils.readdir(filedir);

                                                                        case 3:
                                                                            logs = _context3.sent;

                                                                            if (!(logs && logs.length)) {
                                                                                _context3.next = 20;
                                                                                break;
                                                                            }

                                                                            _context3.t0 = _regenerator2.default.keys(logs);

                                                                        case 6:
                                                                            if ((_context3.t1 = _context3.t0()).done) {
                                                                                _context3.next = 18;
                                                                                break;
                                                                            }

                                                                            file = _context3.t1.value;
                                                                            logdir = path.join(filedir, logs[file]);
                                                                            _context3.next = 11;
                                                                            return FileUtils.getfileStat(logdir);

                                                                        case 11:
                                                                            stat = _context3.sent;

                                                                            if (!stat.isFile) {
                                                                                _context3.next = 16;
                                                                                break;
                                                                            }

                                                                            subPath = logdir.split('src')[1]; //文件路径

                                                                            name = logdir.split(path.join(filePath, '/'))[1]; //获取log文件名

                                                                            return _context3.abrupt('return', { path: subPath, name: name, size: stat.size });

                                                                        case 16:
                                                                            _context3.next = 6;
                                                                            break;

                                                                        case 18:
                                                                            _context3.next = 21;
                                                                            break;

                                                                        case 20:
                                                                            return _context3.abrupt('return', null);

                                                                        case 21:
                                                                        case 'end':
                                                                            return _context3.stop();
                                                                    }
                                                                }
                                                            }, _callee3, _this2);
                                                        }));

                                                        return function (_x5) {
                                                            return _ref4.apply(this, arguments);
                                                        };
                                                    }()));

                                                case 6:
                                                    files = _context4.sent;

                                                    resolve(files);
                                                    _context4.next = 13;
                                                    break;

                                                case 10:
                                                    _context4.prev = 10;
                                                    _context4.t0 = _context4['catch'](0);

                                                    reject(_context4.t0);

                                                case 13:
                                                case 'end':
                                                    return _context4.stop();
                                            }
                                        }
                                    }, _callee4, _this2, [[0, 10]]);
                                }));

                                return function (_x3, _x4) {
                                    return _ref3.apply(this, arguments);
                                };
                            }()));

                        case 1:
                        case 'end':
                            return _context5.stop();
                    }
                }
            }, _callee5, _this2);
        }))();
    },


    /**
     * 读取目录
     * @param {*} path
     */
    readdir: function readdir(readPath) {
        var _this3 = this;

        return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6() {
            return _regenerator2.default.wrap(function _callee6$(_context6) {
                while (1) {
                    switch (_context6.prev = _context6.next) {
                        case 0:
                            return _context6.abrupt('return', new _promise2.default(function (resolve, reject) {
                                fs.readdir(readPath, function (err, files) {
                                    if (err) {
                                        console.log('\u83B7\u53D6\u6587\u4EF6\u5217\u8868\u5931\u8D25');
                                        reject(err);
                                    } else {
                                        resolve(files);
                                    }
                                });
                            }));

                        case 1:
                        case 'end':
                            return _context6.stop();
                    }
                }
            }, _callee6, _this3);
        }))();
    },


    /**
     * 获取文件信息
     * @param {*} path
     */
    getfileStat: function getfileStat(filepath) {
        var _this4 = this;

        return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7() {
            return _regenerator2.default.wrap(function _callee7$(_context7) {
                while (1) {
                    switch (_context7.prev = _context7.next) {
                        case 0:
                            return _context7.abrupt('return', new _promise2.default(function (resolve, reject) {
                                fs.stat(filepath, function (eror, stats) {
                                    if (eror) {
                                        console.log('\u83B7\u53D6\u6587\u4EF6stats\u5931\u8D25');
                                        reject(eror);
                                    } else {
                                        if (stats.isFile()) {
                                            //是文件
                                            resolve((0, _extends3.default)({ isFile: true, filepath: filepath }, stats));
                                        } else if (stats.isDirectory()) {
                                            resolve((0, _extends3.default)({ isFile: false, filepath: filepath }, stats));
                                        } else {
                                            reject(new Error('\u672A\u77E5\u7C7B\u578B!'));
                                        }
                                    }
                                });
                            }));

                        case 1:
                        case 'end':
                            return _context7.stop();
                    }
                }
            }, _callee7, _this4);
        }))();
    },


    /**
     * 读取文件内容
     * @param {*} path
     * @param encode 编码格式
     * @returns { code,data}
     */
    readerFile: function readerFile(fileFullPath, encode) {
        var _this5 = this;

        return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8() {
            return _regenerator2.default.wrap(function _callee8$(_context8) {
                while (1) {
                    switch (_context8.prev = _context8.next) {
                        case 0:
                            return _context8.abrupt('return', new _promise2.default(function (resolve, reject) {
                                fs.readFile(fileFullPath, function (err, data) {
                                    if (err) {
                                        console.log('\u8BFB\u53D6\u6587\u4EF6:' + fileFullPath + '\u5185\u5BB9\u5931\u8D25,' + err);
                                        reject(err);
                                    } else if (encode) {
                                        console.log('\u8BFB\u53D6\u6587\u4EF6:' + fileFullPath + '\u6210\u529F\uFF01');
                                        resolve({ code: 200, data: data.toString(encode || 'utf-8') });
                                    } else {
                                        resolve({ code: 200, data: data });
                                    }
                                });
                            }));

                        case 1:
                        case 'end':
                            return _context8.stop();
                    }
                }
            }, _callee8, _this5);
        }))();
    },


    /**
     * 创建文件夹
     * @param {*} filepath
     * @returns Boolean
     */
    createDir: function createDir(filepath) {
        var _this6 = this;

        return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9() {
            return _regenerator2.default.wrap(function _callee9$(_context9) {
                while (1) {
                    switch (_context9.prev = _context9.next) {
                        case 0:
                            return _context9.abrupt('return', new _promise2.default(function (resolve, reject) {
                                fs.mkdir(filepath, function (err) {
                                    if (err) {
                                        console.log('\u521B\u5EFA\u6587\u4EF6\u5939:' + filepath + '\u5931\u8D25\uFF01');
                                        reject(err);
                                    } else {
                                        console.log('\u521B\u5EFA\u6587\u4EF6\u5939:' + filepath + '\u6210\u529F\uFF01');
                                        resolve(true);
                                    }
                                });
                            }));

                        case 1:
                        case 'end':
                            return _context9.stop();
                    }
                }
            }, _callee9, _this6);
        }))();
    },


    /**
     * 判断一个文件夹是否存在
     * @param {*} dirpath 文件夹路径
     * @param {*} isCreateDir  如果不存在就创建
     */
    isDirExists: function isDirExists(dirpath, isCreateDir) {
        var _this7 = this;

        return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee11() {
            return _regenerator2.default.wrap(function _callee11$(_context11) {
                while (1) {
                    switch (_context11.prev = _context11.next) {
                        case 0:
                            return _context11.abrupt('return', new _promise2.default(function () {
                                var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee10(resolve, reject) {
                                    var res;
                                    return _regenerator2.default.wrap(function _callee10$(_context10) {
                                        while (1) {
                                            switch (_context10.prev = _context10.next) {
                                                case 0:
                                                    if (fs.existsSync(dirpath)) {
                                                        _context10.next = 11;
                                                        break;
                                                    }

                                                    if (!isCreateDir) {
                                                        _context10.next = 8;
                                                        break;
                                                    }

                                                    _context10.next = 4;
                                                    return FileUtils.createDir(dirpath);

                                                case 4:
                                                    res = _context10.sent;

                                                    if (res) {
                                                        resolve(res);
                                                    } else {
                                                        reject(res);
                                                    }
                                                    _context10.next = 9;
                                                    break;

                                                case 8:
                                                    resolve(false);

                                                case 9:
                                                    _context10.next = 12;
                                                    break;

                                                case 11:
                                                    resolve(true);

                                                case 12:
                                                case 'end':
                                                    return _context10.stop();
                                            }
                                        }
                                    }, _callee10, _this7);
                                }));

                                return function (_x6, _x7) {
                                    return _ref5.apply(this, arguments);
                                };
                            }()));

                        case 1:
                        case 'end':
                            return _context11.stop();
                    }
                }
            }, _callee11, _this7);
        }))();
    },


    /**
     * 删除文件
     * @param {*} fileFullPath 文件的路径
     * @returns {code }
     */
    deleteFile: function deleteFile(fileFullPath) {
        var _this8 = this;

        return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee12() {
            return _regenerator2.default.wrap(function _callee12$(_context12) {
                while (1) {
                    switch (_context12.prev = _context12.next) {
                        case 0:
                            return _context12.abrupt('return', new _promise2.default(function (resolve, reject) {
                                fs.unlink(fileFullPath, function (err) {
                                    //上传成功后删除临时文件
                                    if (err) {
                                        console.log('\u5220\u9664\u6587\u4EF6:' + fileFullPath + '\u5F02\u5E38!');
                                        reject(err);
                                    } else {
                                        console.log('\u5220\u9664\u6587\u4EF6:' + fileFullPath + '\u6210\u529F\uFF01');
                                        resolve({ code: 200, path: fileFullPath });
                                    }
                                });
                            }));

                        case 1:
                        case 'end':
                            return _context12.stop();
                    }
                }
            }, _callee12, _this8);
        }))();
    },


    /**
     * 写内容到文件
     * @param {*} path
     * @param encode 编码格式
     * @returns { code,data}
     */
    writeFile: function writeFile(fileFullPath, content) {
        var _this9 = this;

        return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee13() {
            return _regenerator2.default.wrap(function _callee13$(_context13) {
                while (1) {
                    switch (_context13.prev = _context13.next) {
                        case 0:
                            return _context13.abrupt('return', new _promise2.default(function (resolve, reject) {
                                fs.writeFile(fileFullPath, content, function (err, data) {
                                    if (err) {
                                        console.log('\u5199\u5165\u6587\u4EF6:' + fileFullPath + '\u5185\u5BB9\u5931\u8D25,' + err);
                                        reject(err);
                                    } else if (content) {
                                        console.log('\u5199\u5165\u6587\u4EF6:' + fileFullPath + '\u6210\u529F\uFF01');
                                        resolve({ code: 200, data: data.toString(content || 'utf-8') });
                                    } else {
                                        resolve({ code: 200, data: data });
                                    }
                                });
                            }));

                        case 1:
                        case 'end':
                            return _context13.stop();
                    }
                }
            }, _callee13, _this9);
        }))();
    }
};
module.exports = FileUtils;