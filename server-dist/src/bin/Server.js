'use strict';

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

var Koa2 = require('koa'); //koa
var KoaCors = require('koa-cors'); //核心文件
var KoaBody = require('koa-body'); //koa文件上传
var koaJWT = require('koa-jwt'); //jwt生成解析
var koaStatic = require('koa-static'); //静态文件
var responseTime = require('koa-response-time');
var consola = require('consola'); //打印

var _require = require('nuxt'),
    Nuxt = _require.Nuxt,
    Builder = _require.Builder; //nuxt渲染框架


var config = require(':config/server.base.config'); //配置文件
var nuxtConfig = require(':root/nuxt.config'); //nuxt配置文件
var controllers = require(':controllers/index'); //路由入口
var ErrorRoutesCatch = require(':middleware/ErrorRoutesCatch'); //全局错误捕获

var _require2 = require(':lib/logger4'),
    accessLogger = _require2.accessLogger; //日志系统


var app = new Koa2();
var host = process.env.HOST || config.host || '127.0.0.1';
var port = process.env.PORT || config.port || 3000;
config.dev = !(app.env === 'production');
module.exports = function () {
    function Server() {
        (0, _classCallCheck3.default)(this, Server);
    }

    (0, _createClass3.default)(Server, null, [{
        key: 'run',
        value: function () {
            var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
                var nuxt, builder;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                nuxt = new Nuxt(nuxtConfig);

                                if (!config.isNuxtRender) {
                                    _context.next = 6;
                                    break;
                                }

                                if (!config.dev) {
                                    _context.next = 6;
                                    break;
                                }

                                builder = new Builder(nuxt);
                                _context.next = 6;
                                return builder.build();

                            case 6:
                                app.use(accessLogger());
                                app.use(responseTime({ hrtime: true }));
                                app.use(KoaCors());
                                app.use(ErrorRoutesCatch);
                                app.use(koaStatic(config.staticPath));
                                app.use(KoaBody({
                                    multipart: true,
                                    strict: false,
                                    formidable: {
                                        uploadDir: config.uploadDir, //设置上传缓存文件夹
                                        maxFileSize: 1024 * 1024 * 10 * 1024 // 设置上传文件大小最大限制，默认1G 1024M
                                    },
                                    jsonLimit: '10mb',
                                    formLimit: '10mb',
                                    textLimit: '10mb'
                                }));
                                app.use(koaJWT({ secret: config.jwtPublicKey }).unless({ path: config.unlessPath })); //jwt 注入
                                app.use(controllers.routes()); //路由注入
                                app.use(controllers.allowedMethods());
                                if (config.isNuxtRender) {
                                    app.use(function (ctx) {
                                        ctx.status = 200;
                                        return new _promise2.default(function (resolve, reject) {
                                            ctx.res.on('close', resolve);
                                            ctx.res.on('finish', resolve);
                                            nuxt.render(ctx.req, ctx.res, function (promise) {
                                                console.log('Nuxt \u6E32\u67D3\u5B8C\u6210!');
                                                promise.then(resolve).catch(reject);
                                            });
                                        });
                                    });
                                }
                                app.listen(port, host);
                                consola.ready({
                                    message: 'Server listening on http://' + host + ':' + port + '/login',
                                    badge: true
                                });

                            case 18:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function run() {
                return _ref.apply(this, arguments);
            }

            return run;
        }()
    }]);
    return Server;
}();