'use strict';

/***
 * 错误捕获
 */
var result = require(':lib/Result');
module.exports = function (ctx, next) {
    return next().catch(function (err) {
        var status = err.status;
        if (status == 401) {
            ctx.body = result.authorities();
        } else if (status == 404) {
            ctx.body = result.failed(204, '非法请求!');
        } else {
            ctx.body = result.failed(null, String(err));
        }
    });
};