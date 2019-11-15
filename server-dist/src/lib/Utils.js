'use strict';

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MD5 = require('blueimp-md5');
var UUID = require('uuid');
var JWT = require('jsonwebtoken');
var config = require(':config/server.base.config'); //配置文件
/**
 * 工具类
 */
var Utils = {
    //获取models路径
    SRC_PATH: process.cwd() + '/server/src',
    MODELS_PATH: process.cwd() + '/server/src/models',

    /**
     * 获取jwt数据
     * @param {*} authorization
     */
    getJwtData: function getJwtData(authorization) {
        if (!authorization) return null;
        return JWT.verify(authorization, config.jwtPublicKey);
    },


    /**
     * 签发jwt
     * @param {*} data  你要保存到token的数据
     * @param {*} expiresIn  秒到期时间
     */
    signJWT: function signJWT(data, expiresIn) {
        var time = 60 * 30; //默认为30分钟的有效期
        var sign = { data: { data: data }, publicKey: config.jwtPublicKey, expiresIn: { expiresIn: expiresIn || time } };
        return JWT.sign(sign.data, sign.publicKey, sign.expiresIn);
    },


    /**
     * 取随机数
     */
    getRandomNum: function getRandomNum() {
        var Min = 10000000;
        var Max = 99999999;
        var Range = Max - Min;
        var Rand = Math.random();
        return Min + Math.round(Rand * Range);
    },


    /**
     * 获取MD5加密
     */
    getMd5: function getMd5(str) {
        return MD5(str + '_SERVICE.MU.HOME').toUpperCase();
    },


    /**
     * 获取随机UUID 可能会重复
     */
    getRandomUUID: function getRandomUUID(isLowerCase) {
        // return UUID.v4().replace(/-/g, '');
        var str = Utils.getMd5(UUID.v4());
        return isLowerCase ? str : str.toUpperCase();
    },


    /**
     * 根据时间戳生成UUID
     * @param {*} isLowerCase 是否小写
     */
    getTimeStampUUID: function getTimeStampUUID(isLowerCase) {
        // const str = UUID.v1().replace(/-/g, '');
        var str = Utils.getMd5(UUID.v1());
        return isLowerCase ? str : str.toUpperCase();
    },


    /**
     * 获取当前时间戳 毫秒
     */
    getTimeStamp: function getTimeStamp() {
        return Date.parse(new Date());
    },


    /**
     * 获取年月日 2019-09-25
     * @param {*} connect 连接符
     */
    getYearMonthDay: function getYearMonthDay(connect) {
        var str = connect || '-';
        var date = new Date();
        var Y = date.getFullYear();
        var M = date.getMonth() + 1;
        var D = date.getDay();
        return '' + Y + str + (M > 10 ? M : '0' + M) + str + (D > 10 ? D : '0' + D);
    },


    /**
     * 获取当前年月日 时分秒
     * @param {*} c1 连接符
     * @param {*} c2 连接符
     */
    getYearMonthDayAndHMI: function getYearMonthDayAndHMI(c1, c2) {
        var str = c1 || ':';
        var date = new Date();
        var H = date.getHours();
        var M = date.getMinutes();
        var I = date.getSeconds();
        var YMD = Utils.getYearMonthDay(c2);
        return YMD + ' ' + (H > 10 ? H : '0' + H) + str + (M > 10 ? M : '0' + M) + str + (I > 10 ? I : 'I' + I);
    },


    /**
     * 截取字符串， 多余的部分用...代替
     * @param {*} str
     * @param {*} len
     */
    setString: function setString(str, len) {
        var StrLen = 0;
        var s = '';
        for (var i = 0; i < str.length; i++) {
            if (str.charCodeAt(i) > 128) {
                StrLen += 2;
            } else {
                StrLen++;
            }
            s += str.charAt(i);
            if (StrLen >= len) {
                return s + '...';
            }
        }
        return s;
    },


    /**
     * 格式化设置
     * @param {*} GetOptions
     */
    optionFormat: function optionFormat(GetOptions) {
        var options = '{';
        for (var n = 0; n < GetOptions.length; n++) {
            options = options + '\'' + GetOptions[n].option_name + '\':\'' + GetOptions[n].option_value + '\'';
            if (n < GetOptions.length - 1) {
                options = options + ',';
            }
        }
        return JSON.parse(options + '}');
    },


    /**
     * 数组去重
     * @param {*} arr
     */
    hovercUnique: function hovercUnique(arr) {
        var n = {};
        var r = [];
        for (var i = 0; i < arr.length; i++) {
            if (!n[arr[i]]) {
                n[arr[i]] = true;
                r.push(arr[i]);
            }
        }
        return r;
    },


    /**
     * 获取json长度
     * @param {*} jsonData
     */
    getJsonLength: function getJsonLength(jsonData) {
        var arr = [];
        for (var item in jsonData) {
            arr.push(jsonData[item]);
        }
        return arr.length;
    },


    /**
     * 线性数据转化为树
     * @param {Object} source 源数据
     * @param {Object} parentKey 父级id key
     * @param {childrenKey} childrenKey 子集key
     * @param {Object} pId 父级标识符
     */
    listToTree: function listToTree(source, parentKey, childrenKey, pId) {
        var data = JSON.parse((0, _stringify2.default)(source));
        var tree = [];
        var temp = null;
        for (var i = 0; i < data.length; i++) {
            if (data[i][parentKey] == pId) {
                var obj = data[i];
                temp = Utils.listToTree(data, parentKey, childrenKey, data[i][childrenKey]);
                if (temp.length > 0) {
                    obj.children = temp;
                }
                tree.push(obj);
            }
        }
        return tree;
    },


    /**
     * 移除对象中的无效属性
     * @param obj
     * @return {*}
     */
    removeEmpty: function removeEmpty(obj) {
        (0, _keys2.default)(obj).forEach(function (key) {
            obj[key] && (0, _typeof3.default)(obj[key]) === 'object' && Utils.removeEmpty(obj[key]) || (obj[key] === undefined || obj[key] === null || obj[key] === '') && delete obj[key];
        });
        return obj;
    },


    /**
     * 深度拷贝
     * @param {*} obj
     */
    deepCloneObject: function deepCloneObject(object) {
        return JSON.parse((0, _stringify2.default)(object));
        // const obj = JSON.parse(JSON.stringify(object));
        // let objClone = Array.isArray(obj) ? [] : {};
        // if (obj && typeof obj === 'object') {
        //     for (let key in obj) {
        //         if (obj.hasOwnProperty(key)) {
        //             //判断ojb子元素是否为对象，如果是，递归复制
        //             if (obj[key] && typeof obj[key] === 'object') {
        //                 objClone[key] = Utils.deepCloneObject(obj[key]);
        //             } else {
        //                 //如果不是，简单复制
        //                 objClone[key] = obj[key];
        //             }
        //         }
        //     }
        // }
        // return objClone;
    },


    /**
     * 字符转小写
     */
    getLC: function getLC(val) {
        if (!val) throw Error('\u5B57\u7B26\u4E32\u4E0D\u5B58\u5728 val' + val);
        return val.toLowerCase();
    },


    /**
     * 字符转大写
     * @param {*} val
     */
    getUC: function getUC(val) {
        if (!val) throw Error('\u5B57\u7B26\u4E32\u4E0D\u5B58\u5728 val' + val);
        return val.toLocaleUpperCase();
    },


    /**
     * js生成随机数
     * @param {*} lower
     * @param {*} upper
     */
    random: function random(lower, upper) {
        return Math.floor(Math.random() * (upper - lower)) + lower;
    },


    /**
     * 生成文件名
     * @param {*} isLowerCase
     */
    getFileNameUUID32: function getFileNameUUID32(nameExtension, isLowerCase) {
        var str = Utils.getMd5(UUID.v1());
        var name = isLowerCase ? str : str.toUpperCase();
        return 'BIUXS_WEB_' + name + '.' + nameExtension;
    },


    // 转为unicode 编码
    encodeUnicode: function encodeUnicode(str) {
        var res = [];
        for (var i = 0; i < str.length; i++) {
            res[i] = ('00' + str.charCodeAt(i).toString(16)).slice(-4);
        }
        return '\\u' + res.join('\\u');
    },


    // 解码
    decodeUnicode: function decodeUnicode(str) {
        str = str.replace(/\\/g, '%');
        //转换中文
        str = unescape(str);
        //将其他受影响的转换回原来
        str = str.replace(/%/g, '\\');
        //对网址的链接进行处理
        str = str.replace(/\\/g, '');
        return str;
    },


    /**
     * 获取文件的后缀名
     * @param {*} filename
     */
    getExtname: function getExtname(filename) {
        if (!filename || typeof filename != 'string') return false;
        var a = filename.split('').reverse().join('');
        var b = a.substring(0, a.search(/\./)).split('').reverse().join('');
        return b;
    }
};
module.exports = Utils;