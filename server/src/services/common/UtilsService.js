/**
 * 公共工具类
 */
const svgCaptcha = require('svg-captcha');
const result = require(':lib/Result');
module.exports = class {
    async getImgValidate() {
        const { text, data } = svgCaptcha.create({
            inverse: false, // 翻转颜色
            size: 4, //随机字符串长度
            noise: 2, // 噪声线条数
            fontSize: 46,
            width: 100,
            height: 30,
            color: true //随机颜色

            // background: true
        });
        return result.success(null, { img: data, text });
    }
};
