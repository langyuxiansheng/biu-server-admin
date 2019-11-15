"use strict";

/**
 * 返回数据实体对象
 */
module.exports = {
    /**
     * 状态码
     */
    CODE: {
        SUCCESS: 200, //成功
        OTHER: 204, //其它状态
        FAILED: 400, //操作失败
        AUTHORITIES: 401, //身份验证失败
        NO_AUTHORITY: 403 //无权限
    },

    /**
     * 返回提示
     */
    MESSAGE: {
        SUCCESS: "SUCCESS!",
        FAILED: "\u64CD\u4F5C\u5931\u8D25!",
        PARAMS_LACK: "\u53C2\u6570\u4E0D\u9F50!",
        AUTHORITIES: "\u767B\u9646\u5931\u6548\u6216\u8EAB\u4EFD\u8FC7\u671F!" //身份验证失败
    },

    /**
     * 返回成功结果
     */
    success: function success(msg, data) {
        return {
            code: this.CODE.SUCCESS,
            data: data,
            msg: msg || this.MESSAGE.SUCCESS
        };
    },


    /**
     * 请求操作失败
     */
    failed: function failed(msg, code, data) {
        return {
            data: data,
            msg: msg || this.MESSAGE.FAILED,
            code: code || this.CODE.FAILED
        };
    },


    /**
     * 参数不齐
     * @param {*} msg
     * @param {*} code
     * @param {*} data
     */
    paramsLack: function paramsLack(msg, code, data) {
        return {
            code: code || this.CODE.FAILED,
            data: data,
            msg: msg || this.MESSAGE.PARAMS_LACK
        };
    },


    /**
     * 身份过期
     * @param {*} msg
     * @param {*} code
     * @param {*} data
     */
    authorities: function authorities(msg, code, data) {
        return {
            code: code || this.CODE.AUTHORITIES,
            data: data,
            msg: msg || this.MESSAGE.AUTHORITIES
        };
    },


    /**
     * 带分页的数据对象
     * @param {*} msg
     * @param {*} code
     * @param {*} data
     * @param {*} total
     * @param {*} page
     * @param {*} limit
     */
    pageData: function pageData(msg, code, data, total, page, limit) {
        return {
            code: code || this.CODE.SUCCESS,
            data: data,
            total: total,
            page: page,
            limit: limit,
            msg: msg || this.MESSAGE.SUCCESS
        };
    },


    /**
     * 代码分页(非数据库分页)
     * @param {*} msg
     * @param {*} code
     * @param {*} data 数据列表
     * @param {*} page 当前页
     * @param {*} limit 每页大小
     */
    totalPageData: function totalPageData(msg, code, data, page, limit) {
        var result = {
            code: code || this.CODE.SUCCESS,
            data: [],
            limit: limit,
            page: page,
            total: 0,
            msg: msg || this.MESSAGE.SUCCESS
        };

        //分页
        if (data && limit && page) {
            if (data && data.length > 0) {
                //索引
                var index = (page - 1) * limit;
                for (var i = index; i < page * limit; i++) {
                    if (data[i]) result.data.push(data[i]);
                }
            }
            //总大小
            result.total = data.length;
        } else {
            result.data = data;
        }
        return result;
    }
};