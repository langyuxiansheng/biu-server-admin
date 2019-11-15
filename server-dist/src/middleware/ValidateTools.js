'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ValidateTools = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var publicKey = _fs2.default.readFileSync(_path2.default.join(__dirname, '../../publicKey.pub'));

/**
 * 验证工具类
 */

var ValidateTools = exports.ValidateTools = function () {
    function ValidateTools() {
        (0, _classCallCheck3.default)(this, ValidateTools);
    }

    (0, _createClass3.default)(ValidateTools, [{
        key: 'validateJWT',

        /**
         * 验证解密JWT返回处理结果
         * @param {*} authorities
         */
        value: function validateJWT(authorities) {
            try {
                console.log('validateJWT======', authorities.substr(7));
                return _jsonwebtoken2.default.verify(authorities.substr(7), publicKey);
            } catch (err) {
                console.log('JWT\u9A8C\u8BC1\u7ED3\u679C', err);
                return false;
            }
        }

        /**
         * 获取jwttoken
         * @param {*} data
         * @param {*} expiresIn
         */

    }, {
        key: 'getJWT',
        value: function getJWT(data, expiresIn) {
            try {
                return _jsonwebtoken2.default.sign({
                    data: data // 你要保存到token的数据
                }, publicKey, {
                    expiresIn: expiresIn //秒到期时间
                });
            } catch (err) {
                console.log('JWT\u52A0\u5BC6\u9519\u8BEF', err);
                throw err;
            }
        }
    }]);
    return ValidateTools;
}();