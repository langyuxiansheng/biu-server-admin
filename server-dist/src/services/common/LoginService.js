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
 * 用户登录
 */
var result = require(':lib/Result');

var _require = require(':lib/Utils'),
    MODELS_PATH = _require.MODELS_PATH,
    getLC = _require.getLC,
    signJWT = _require.signJWT,
    deepCloneObject = _require.deepCloneObject;

var _require2 = require(':lib/sequelize'),
    BiuDB = _require2.BiuDB;

var SysAdminBaseModel = BiuDB.import(MODELS_PATH + '/system/SysAdminBaseModel');
module.exports = function () {
    function _class() {
        (0, _classCallCheck3.default)(this, _class);
    }

    (0, _createClass3.default)(_class, [{
        key: 'userLoginForSysAdmin',

        /**
         * 管理员登录
         * @param data 登录数据
         * @param cookies cookie
         */
        value: function () {
            var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_ref2) {
                var data = _ref2.data,
                    cookies = _ref2.cookies;
                var cookieCode, account, password, code, queryData, user, info, jwt;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                cookieCode = cookies.get('IMG-VALIDATE-DATA');

                                if (cookieCode) {
                                    _context.next = 3;
                                    break;
                                }

                                return _context.abrupt('return', result.failed('\u9A8C\u8BC1\u7801\u5DF2\u8FC7\u671F!'));

                            case 3:
                                account = data.account, password = data.password, code = data.code;

                                if (!(!account || !password || !code)) {
                                    _context.next = 6;
                                    break;
                                }

                                return _context.abrupt('return', result.paramsLack());

                            case 6:
                                if (!(getLC(code) !== getLC(cookieCode))) {
                                    _context.next = 8;
                                    break;
                                }

                                return _context.abrupt('return', result.failed('\u9A8C\u8BC1\u7801\u9519\u8BEF!'));

                            case 8:
                                queryData = {
                                    where: { account: account, isDelete: false },
                                    attributes: { exclude: ['isDelete', 'createdTime', 'updatedTime'] }
                                };
                                _context.prev = 9;
                                _context.next = 12;
                                return SysAdminBaseModel.findOne(queryData);

                            case 12:
                                user = _context.sent;

                                if (user) {
                                    _context.next = 15;
                                    break;
                                }

                                return _context.abrupt('return', result.failed('用户不存在!'));

                            case 15:
                                if (!(password !== user.password)) {
                                    _context.next = 17;
                                    break;
                                }

                                return _context.abrupt('return', result.failed('账号或密码输入错误!'));

                            case 17:
                                if (user.roleId) {
                                    _context.next = 19;
                                    break;
                                }

                                return _context.abrupt('return', result.failed('账号异常请联系管理员,异常信息:"未设置用户的角色!"'));

                            case 19:
                                info = deepCloneObject(user); //克隆一个对象

                                info['userId'] = user.adminId; //设置通用id名
                                info['userName'] = user.adminName; //设置通用用户名
                                jwt = signJWT(info, '2h'); //验证通过签发jwt,2小时有效!

                                return _context.abrupt('return', result.success(null, { jwt: jwt, user: info }));

                            case 26:
                                _context.prev = 26;
                                _context.t0 = _context['catch'](9);

                                console.log(_context.t0);
                                return _context.abrupt('return', result.failed(_context.t0));

                            case 30:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[9, 26]]);
            }));

            function userLoginForSysAdmin(_x) {
                return _ref.apply(this, arguments);
            }

            return userLoginForSysAdmin;
        }()
    }]);
    return _class;
}();