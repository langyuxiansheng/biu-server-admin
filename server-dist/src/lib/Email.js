'use strict';

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var nodemailer = require('nodemailer');
module.exports = function () {
    function EMail(options) {
        (0, _classCallCheck3.default)(this, EMail);

        this.options = {
            host: 'smtp.qq.com',
            port: 465,
            fromUser: '"发送人" <user@qq.com>',
            secureConnection: true,
            // 我们需要登录到网页邮箱中，然后配置SMTP和POP3服务器的密码
            auth: {
                user: 'user@qq.com',
                pass: 'loginkey' //邮箱生成的登录key
            }
        };
        if (options) {
            for (var key in options) {
                this.options[key] = options[key];
            }
        }
        this.mailer = nodemailer.createTransport(this.options);
    }

    /**
     * 发送邮件
     * @param {*} toName 接收者的名字
     * @param {*} toEmail 接收邮件的地址
     */


    (0, _createClass3.default)(EMail, [{
        key: 'sendEmail',
        value: function sendEmail(_ref) {
            var toName = _ref.toName,
                toEmail = _ref.toEmail,
                subject = _ref.subject,
                message = _ref.message;

            var sendHtml = '<div>' + toName + ',' + message + '</div>';
            var mailOptions = {
                // 发送邮件的地址
                from: this.options.fromUser, // login user must equal to this user
                // 接收邮件的地址
                to: toEmail, // xrj0830@gmail.com
                // 邮件主题
                subject: subject || '你有一条新消息',
                // 以HTML的格式显示，这样可以显示图片、链接、字体颜色等信息
                html: sendHtml
            };
            return this.mailer.sendMail(mailOptions);
        }
    }]);
    return EMail;
}();