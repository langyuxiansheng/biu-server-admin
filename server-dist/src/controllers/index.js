'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//主路由文件
var KoaRouter = require('koa-router');
var models = require(':controllers/models');
//所有的API接口都以/v1/api开头
var router = new KoaRouter({ prefix: '/v1/api/' });
//整合路由
(0, _keys2.default)(models).forEach(function (key) {
    (0, _keys2.default)(models[key]).forEach(function (k2) {
        router.use(key.toLowerCase(), models[key][k2].routes(), models[key][k2].allowedMethods());
    });
});

// console.log(router);
module.exports = router;