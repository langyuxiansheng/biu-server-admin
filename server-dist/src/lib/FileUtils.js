'use strict';

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
    }
};
module.exports = FileUtils;