/**
 * 公共工具类
 */
const svgCaptcha = require('svg-captcha');
const result = require(':lib/Result');
const Email = require(':lib/Email');
const config = require(':config/server.base.config'); //配置文件
const email = new Email(config.email);
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

    /**
     * 发送邮件
     * @param {*} data
     */
    async sendEmail(data) {
        const { toName, toEmail, message } = data;
        if (!toName || !toEmail || !message) return result.paramsLack();
        try {
            console.log(email);
            const res = await email.sendEmail(data);
            if (res && res.messageId) {
                return result.success();
            }
        } catch (error) {
            console.log(error);
            return result.failed('邮件发送失败!', null, error);
        }
    }
};
