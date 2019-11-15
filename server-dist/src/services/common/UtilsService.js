'use strict';

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
 * 公共工具类
 */
var svgCaptcha = require('svg-captcha');
var result = require(':lib/Result');
module.exports = function () {
    function _class() {
        (0, _classCallCheck3.default)(this, _class);
    }

    (0, _createClass3.default)(_class, [{
        key: 'getImgValidate',
        value: function () {
            var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
                var _svgCaptcha$create, text, data;

                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _svgCaptcha$create = svgCaptcha.create({
                                    inverse: false, // 翻转颜色
                                    size: 4, //随机字符串长度
                                    noise: 2, // 噪声线条数
                                    fontSize: 46,
                                    width: 100,
                                    height: 30,
                                    color: true //随机颜色

                                    // background: true
                                }), text = _svgCaptcha$create.text, data = _svgCaptcha$create.data;
                                return _context.abrupt('return', result.success(null, { img: data, text: text }));

                            case 2:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function getImgValidate() {
                return _ref.apply(this, arguments);
            }

            return getImgValidate;
        }()
    }]);
    return _class;
}();