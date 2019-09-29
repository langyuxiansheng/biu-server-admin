/**
 * 公有方法类
 */

import moment from 'moment';
import MD5 from 'blueimp-md5';
import Cookies from 'js-cookie';
moment.defineLocale('zh-cn', {
    weekdays: '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_')
});

//import moment from 'moment'
const util = {

    /**
     * 设置cookie
     * @param name
     * @param value
     * @param expires
     */
    setCookie(name, value, expires) {
        Cookies.set(name, value, { expires: expires || 7 });
    },

    /**
     * 清除cookie
     * @param name
     * @param isClearAll 是否清除所有
     */
    clearCookie(name) {
        Cookies.remove(name);
    },

    /**
     * 获取cookie
     * @param name
     * @returns {*}
     */
    getCookie(name) {
        return Cookies.get(name);
    },

    /**
     * 转换时间戳
     * @param timestamp
     * @return {string}
     */
    formatDateYearMonthDay(timestamp) {
        if (timestamp) {
            return moment(timestamp * 1000).format(`YYYY-MM-DD`);
        }
    },

    /**
     * 转换时间戳 时分秒
     * @param timestamp
     * @return {string}
     */
    formatDateHourMinSec(timestamp) {
        if (timestamp) {
            return moment(timestamp * 1000).format(`HH:mm:ss`);
        }
    },

    /**
     * 转换时间戳 年月日时分秒
     * @param timestamp
     * @return {string}
     */
    formatDateYearMonthDayAndHms(timestamp) {
        if (timestamp) {
            return moment(timestamp * 1000).format(`YYYY-MM-DD HH:mm:ss`);
        }
    },

    /**
     * 获取今天0点时间戳 秒
     * @return {number}
     */
    getTodayTimeStamp() {
        return new Date(new Date().setHours(0, 0, 0, 0)) / 1000;
    },

    /**
     * 获取当前时间
     * @return {*}
     */
    getThisTime() {
        return util.formatDateYearMonthDayAndHms(new Date(new Date()) / 1000);
    },

    /**
     * 获取今天 23:59分的时间戳
     * @return {number}
     */
    getTodayTimeEnd() {
        return (new Date(new Date().setHours(0, 0, 0, 0)) / 1000) + (24 * 60 * 60) - 1;
    },

    /**
     * 获取昨天 00:00 的时间戳
     * @return {number}
     */
    getYesterdayTime() {
        return (new Date(new Date().setHours(0, 0, 0, 0)) / 1000) - 24 * 60 * 60;
    },

    /**
     * 获取指定时间戳N天前的时间戳
     * @param stamp
     * @param day
     * @return {number}
     */
    getAppointDaysAgoTime(stamp, day) {
        let num = day || 1;
        return (stamp / 1000) - (24 * 60 * 60) * num;
    },

    /**
     * 获取N天前的时间戳
     * @param day
     * @return {number}
     */
    getDaysAgoTime(day) {
        let num = day || 1;
        return (new Date(new Date().setHours(0, 0, 0, 0)) / 1000) - 24 * 60 * 60 * num;
    },

    /**
     * 获取当前年
     */
    getThisYear() {
        return moment().format('YYYY');
    },

    /**
     * 获取本月实际 2017 -01
     */
    getThisMonthDate() {
        return moment().format('YYYY-MM');
    },

    /**
     * 获取今天 2017-01-01
     */
    getTodayDate() {
        return moment().format('YYYY-MM-DD');
    },

    /**
     * 将秒转换为 天-时-分-秒
     * @param msd {Number} 秒数
     * */
    secondToDate(msd) {
        let time = msd;
        if (time != null && time != '') {
            if (time > 60 && time < 60 * 60) {
                time = parseInt(time / 60.0) + '分钟' + parseInt((parseFloat(time / 60.0) -
                    parseInt(time / 60.0)) * 60) + '秒';
            } else if (time >= 60 * 60 && time < 60 * 60 * 24) {
                time = parseInt(time / 3600.0) + '小时' + parseInt((parseFloat(time / 3600.0) -
                        parseInt(time / 3600.0)) * 60) + '分钟' +
                    parseInt((parseFloat((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60) -
                        parseInt((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60)) * 60) + '秒';
            } else if (time >= 60 * 60 * 24) {
                time = parseInt(time / 3600.0 / 24) + '天' + parseInt((parseFloat(time / 3600.0 / 24) -
                        parseInt(time / 3600.0 / 24)) * 24) + '小时' + parseInt((parseFloat(time / 3600.0) -
                        parseInt(time / 3600.0)) * 60) + '分钟' +
                    parseInt((parseFloat((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60) -
                        parseInt((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60)) * 60) + '秒';
            } else {
                time = parseInt(time) + '秒';
            }
        }
        return time;
    },

    /**
     * 获取年月日 星期 时分秒
     * @return {string}
     */
    geyThisDateYYMMDDHmi() {
        return moment().format(`YYYY年MM月DD日 dddd HH:mm:ss`);
    },

    /**
     * 转换时间戳 年月日时分秒
     * @param timestamp
     * @return {string}
     */
    formatDateYearMonthDayAndHmsChinese(timestamp) {
        if (timestamp) {
            return moment(timestamp * 1000).format(`YYYY年MM月DD HH:mm:ss`);
        }
    },

    /**
     * 获得本月的截止日期
     * @return {*|string}
     */
    getMonthEndDate() {
        let now = new Date(); //当前日期
        let nowMonth = now.getMonth(); //当前月
        let nowYear = now.getFullYear(); //当前年
        let monthEndDate = new Date(nowYear, nowMonth, util.getMonthDays(nowMonth));
        return util.formatDate(monthEndDate);
    },

    /**
     * 获得某月的天数
     * @param myMonth
     * @return {number}
     */
    getMonthDays(myMonth) {
        let now = new Date(); //当前日期
        let nowYear = now.getFullYear(); //当前年
        let monthStartDate = new Date(nowYear, myMonth, 1);
        let monthEndDate = new Date(nowYear, myMonth + 1, 1);
        let days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
        return days;
    },

    /**
     * 格局化日期：yyyy-MM-dd
     * @param date
     * @return {string}
     */
    formatDate(date) {
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let weekDay = date.getDate();

        if (month < 10) {
            month = '0' + month;
        }
        if (weekDay < 10) {
            weekDay = '0' + weekDay;
        }
        return (year + '-' + month + '-' + weekDay);
    },

    /**
     * 获得本月的開始日期時間戳
     * @return {*|string}
     */
    getMonthBeginDateStamp() {
        let now = new Date(); //当前日期
        let nowMonth = now.getMonth(); //当前月
        let nowYear = now.getFullYear(); //当前年
        let monthStartDate = new Date(nowYear, nowMonth, 1);
        return util.getFormattertDateTimeStamp(util.formatDate(monthStartDate) + ' ' + '00:00:00') / 1000;
    },

    /**
     * 获得本月的截止日期時間戳
     * @return {*|string}
     */
    getMonthEndDateStamp() {
        let now = new Date(); //当前日期
        let nowMonth = now.getMonth(); //当前月
        let nowYear = now.getFullYear(); //当前年
        let monthEndDate = new Date(nowYear, nowMonth, util.getMonthDays(nowMonth));
        return util.getFormattertDateTimeStamp(util.formatDate(monthEndDate) + ' ' + '23:59:59') / 1000;
    },

    /**
     * 根据指定月份时间戳获得最后一天日期時間戳
     * @param stamp 时间戳
     * @return {number}
     */
    getFormattertMonthEndDateStamp(stamp) {
        let arr = util.formatDateYearMonthDay(stamp).split('-');
        let newYear = arr[0]; //取当前的年份
        let newMonth = arr[1]++; //取下一个月的第一天，方便计算（最后一天不固定）
        if (arr[1] > 12) { //如果当前大于12月，则年份转到下一年
            newMonth -= 12; //月份减
            newYear++; //年份增
        }
        let oneDay = (60 * 60 * 24 * 1000) - 1000;
        let date = new Date(newYear, newMonth, 1); //取当年当月中的第一天
        let lastDay = (new Date(date.getTime() - oneDay)).getDate(); //获取当月最后一天日期
        let fmt = newYear + '/' + newMonth + '/' + lastDay + ' ' + '23:59:59';
        return Date.parse(new Date(fmt)) / 1000;
    },

    /**
     * 获取当年第一天的时间戳秒数
     * @return {number}
     */
    getFirstDayOfYear() {
        let date = new Date();
        date.setDate(1);
        date.setMonth(0);

        let y = date.getFullYear(); //年
        let m = date.getMonth() + 1; //月
        let d = date.getDate(); //日
        let fmt = y + '/' + m + '/' + d + ' ' + '00:00:00';
        return Date.parse(new Date(fmt)) / 1000;
    },

    /**
     * 获得指定日期的時間戳秒数
     * @param formatterDate YYYY-MM-DD hh:mm:ii
     * @return {number} 时间戳秒数
     */
    getFormattertDateTimeStamp(formatterDate) {
        if (formatterDate.indexOf('-') != -1) {
            return Date.parse(new Date(formatterDate.replace(/-/g, '/')));
        } else {
            return Date.parse(new Date(formatterDate));
        }
    },

    /**
     * 转换时间戳没有年份
     * @param timestamp
     * @return {string}
     */
    formatDateNoyear(timestamp) {
        if (timestamp) {
            let times = null;
            String(timestamp).length > 10 ? times = timestamp : timestamp = timestamp * 1000;
            if (window.i18n.locale == 'zh') {
                return moment(times).format('MM-DD HH:mm');
            } else {
                let newDate = new Date();
                newDate.setTime(times);
                return newDate.toString().substr(4, 6) + 'th ' + newDate.toString().substr(16, 5);
            }
        }
    },

    /**
     * 转换时间戳没有小时数
     * @param timestamp
     * @return {string}
     */
    formatDateNoHour(timestamp) {
        if (timestamp) {
            let times = null;
            String(timestamp).length > 10 ? times = timestamp : timestamp = timestamp * 1000;
            if (window.i18n.locale == 'zh') {
                return moment(times).format('YYYY-MM-DD');
            } else {
                let newDate = new Date();
                newDate.setTime(times);
                return newDate.toString().substr(4, 6) + 'th ';
            }
        }
    },

    /**
     * 保留两位小数不四舍五入
     * @param value
     * @return {*}
     */
    tofixPrice(value) {
        if (value === 0) {
            return '0.00';
        }
        if (value) {
            let showTwo = value.toFixed(3);
            return showTwo.substring(0, showTwo.lastIndexOf('.') + 3);
        }
    },

    /**
     * 判断是否是对象
     * @param obj
     * @return {boolean}
     */
    isEmpty(obj) {
        return (Object.keys(obj).length === 0 && obj.constructor === Object);
    },

    /**
     * 过滤图片 只保留七牛云的ServerName
     */
    filterUpdateImg(imgs) {
        return imgs.map((img) => {
            if (img.response && img.response.serverName) {
                return img.response.serverName;
            } else if (img.url) {
                if (img.url.indexOf('.com/') != -1) {
                    let subLen = img.url.indexOf('.com/') + 5;
                    return img.url.substring(subLen, img.url.length);
                } else if (img.url.indexOf('.cn/') != -1) {
                    let subLen = img.url.indexOf('.cn/') + 4;
                    return img.url.substring(subLen, img.url.length);
                }
            }
            return img;
        });
    },

    /**
     * 移除对象中的空字符串
     * @param test
     * @param recurse
     */
    deleteEmptyString(test, recurse) {
        for (let i in test) {
            if (test[i] === '') {
                delete test[i];
            } else if (recurse && typeof test[i] === 'object') {
                util.deleteEmptyString(test[i], recurse);
            }
        }
    },

    /**
     * 删除对象中的空Key
     * @param test
     * @param recurse
     */
    deleteEmptyObject(test, recurse) {
        for (let i in test) {
            if (util.isEmpty(test[i])) {
                delete test[i];
            } else if (recurse && typeof test[i] === 'object') {
                util.deleteEmptyObject(test[i], recurse);
            }
        }
    },

    /**
     * 移除对象中的无效属性
     * @param obj
     * @return {*}
     */
    removeEmpty(obj) {
        Object.keys(obj).forEach(function(key) {
            (obj[key] && typeof obj[key] === 'object') && util.removeEmpty(obj[key]) ||
                (obj[key] === undefined || obj[key] === null || obj[key] === '') && delete obj[key];
        });
        return obj;
    },

    /**
     * 深度拷贝
     * @param {*} obj
     */
    deepCloneObject(obj) {
        let objClone = Array.isArray(obj) ? [] : {};
        if (obj && typeof obj === 'object') {
            for (let key in obj) {
                if (obj.hasOwnProperty(key)) {
                    //判断ojb子元素是否为对象，如果是，递归复制
                    if (obj[key] && typeof obj[key] === 'object') {
                        objClone[key] = util.deepCloneObject(obj[key]);
                    } else {
                        //如果不是，简单复制
                        objClone[key] = obj[key];
                    }
                }
            }
        }
        return objClone;
    },

    /**
     * json对象转FormData
     * @param obj
     * @returns {*}
     */
    jsonToFormData(obj) {
        // 创建表单对象
        let formData = new FormData();
        if (obj) {
            for (let k in obj) {
                formData.append(k, obj[k]);
            }
        }
        return formData;
    },

    /**
     * 图片预览
     * @param {*} file
     */
    previewImage(file, domId) {
        var MAXWIDTH = 260;
        var MAXHEIGHT = 180;
        var dom = domId || 'preview';
        var div = document.getElementById(dom);
        if (file.files && file.files[0]) {
            div.innerHTML = '<img id=preview-' + dom + '>';
            var img = document.getElementById('preview-' + dom);
            img.onload = function() {
                var rect = util.clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
                img.width = rect.width;
                img.height = rect.height;
                //                 img.style.marginLeft = rect.left+'px';
                img.style.marginTop = rect.top + 'px';
            };
            var reader = new FileReader();
            reader.onload = function(evt) { img.src = evt.target.result; };
            reader.readAsDataURL(file.files[0]);
        } else { // 兼容IE
            var sFilter = 'filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src="';
            file.select();
            var src = document.selection.createRange().text;
            div.innerHTML = '<img id=imghead>';
            let img = document.getElementById('imghead');
            img.filters.item('DXImageTransform.Microsoft.AlphaImageLoader').src = src;
            var rect = util.clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
            //let status = ('rect:' + rect.top + ',' + rect.left + ',' + rect.width + ',' + rect.height);
            div.innerHTML = "<div id=divhead style='width:" + rect.width + 'px;height:' + rect.height + 'px;margin-top:' + rect.top + 'px;' + sFilter + src + "\"'></div>";
        }
    },

    /**
     * 兼容性视图设置
     * @param {*} maxWidth
     * @param {*} maxHeight
     * @param {*} width
     * @param {*} height
     */
    clacImgZoomParam(maxWidth, maxHeight, width, height) {
        var param = { top: 0, left: 0, width: width, height: height };
        if (width > maxWidth || height > maxHeight) {
            let rateWidth = width / maxWidth;
            let rateHeight = height / maxHeight;

            if (rateWidth > rateHeight) {
                param.width = maxWidth;
                param.height = Math.round(height / rateWidth);
            } else {
                param.width = Math.round(width / rateHeight);
                param.height = maxHeight;
            }
        }
        param.left = Math.round((maxWidth - param.width) / 2);
        param.top = Math.round((maxHeight - param.height) / 2);
        return param;
    },

    /**
     * 线性数据转化为树
     * @param {Object} source 源数据
     * @param {Object} parentKey 父级id key
     * @param {childrenKey} childrenKey 子集key
     * @param {Object} pId 父级标识符
     */
    listToTree(source, parentKey, childrenKey, pId) {
        let data = JSON.parse(JSON.stringify(source));
        let tree = [];
        let temp = null;
        for (let i = 0; i < data.length; i++) {
            if (data[i][parentKey] == pId) {
                let obj = data[i];
                temp = util.listToTree(data, parentKey, childrenKey, data[i][childrenKey]);
                if (temp.length > 0) {
                    obj.children = temp;
                }
                tree.push(obj);
            }
        }
        return tree;
    },

    /**
     * 获取md5大写
     * @param {*} val
     */
    getMD5LC(val) {
        return util.getLC(MD5(`service.mu.home-${val}`));
    },

    /**
     * 获取md5小写
     * @param {*} val
     */
    getMD5UC(val) {
        return util.getUC(MD5(`service.mu.home-${val}`));
    },

    /**
     * 字符转小写
     */
    getLC(val) {
        return (val).toLowerCase();
    },

    /**
     * 字符转大写
     * @param {*} val
     */
    getUC(val) {
        return (val).toLocaleUpperCase();
    }
};

export default util;
