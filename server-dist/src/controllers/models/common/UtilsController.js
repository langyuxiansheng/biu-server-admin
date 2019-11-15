'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 用户登录路由入口
 */
var KoaRouter = require('koa-router');

var _require = require(':services'),
    UtilsService = _require.common.UtilsService;

var controller = new KoaRouter();
var service = new UtilsService();
//登录
controller.get('/getImgValidate', function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(ctx) {
        var res;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return service.getImgValidate();

                    case 2:
                        res = _context.sent;

                        //设置验证码
                        ctx.cookies.set('IMG-VALIDATE-DATA', res.data.text, { httpOnly: true, maxAge: 1000 * 60 * 5 });
                        ctx.body = res;

                    case 5:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function (_x) {
        return _ref.apply(this, arguments);
    };
}());
module.exports = controller;