'use strict';

var path = require('path'); //路径模块

/**
 * 主配置
 */
module.exports = {
    port: 3010, // default: 3000
    host: '127.0.0.1', // default: '127.0.0.1',
    jwtPublicKey: 'jwtPublicKey', //公钥, 加解密jwt使用,建议使用自定义复杂的字符串
    isNuxtRender: true, //是否启用nuxt渲染 true启用管理后台界面,false 不使用管理后台,只是使用API服务器
    uploadDir: path.join(__dirname, '../public/uploads/tmp'), //上传文件缓存路径,相对于 server.base.config.js 的路径
    staticPath: path.join(__dirname, '../public'), //静态文件路径,相对于 server.base.config.js 的路径
    crawler: {
        start: true, //是否开启爬虫系统
        settimeout: 1 //延时多少s启动
    },
    saltMD5: '_SERVICE.BIU.COM', //md5 加盐的字符,随意更改可能会造成密码错误等.
    filePrefix: 'BIU_WEB_', //上传的文件名前缀
    email: {
        host: 'smtp.qq.com', //邮箱服务器地址
        port: 465, //服务器端口 默认 465
        fromUser: '"发送人" <1096432936@qq.com>', //发送人
        secureConnection: true, //仅安全连接模式
        // 我们需要登录到网页邮箱中，然后配置SMTP和POP3服务器的密码
        auth: {
            user: '1096432936@qq.com',
            pass: 'kqpzjioamhbdbaec'
        }
    },
    dbs: { //数据源配置
        BiuDB: {
            name: 'BiuDB', //ORM中使用的名称 建议和key一样的名称
            type: 'sequelize', //orm类型 类型可选sequelize redis等
            config: {
                username: 'biu_server_db', // 数据库用户名
                password: 'mWTNrJ7ewJFDkAd5', // 数据库密码
                database: 'biu_server_db', // 数据库名称
                options: { //配置项
                    dialect: 'mysql', // 数据库类型
                    host: '111.231.225.103', // 服务器地址
                    port: 3306, // 数据库端口号
                    dialectOptions: { // MySQL > 5.5，其它数据库删除此项
                        charset: 'utf8mb4',
                        supportBigNumbers: true,
                        bigNumberStrings: true
                        //collate: 'utf8mb4_unicode_520_ci',
                        //requestTimeout: 60 * 1000 //设置连接超时时间
                    },
                    define: {
                        underscored: false, //	转换列名的驼峰命名规则为下划线命令规则
                        freezeTableName: true, //设置为true时，sequelize不会改变表名，否则可能会按其规则有所调整
                        charset: 'utf8mb4',
                        timestamps: false //为模型添加 createdAt 和 updatedAt 两个时间戳字段
                    },
                    pool: {
                        max: 50, // 连接池中最大连接数量
                        min: 0, // 连接池中最小连接数量
                        idle: 10000 // 如果一个线程 10 秒钟内没有被使用过的话，那么就释放线程
                    }
                }
            }
        }
    },
    unlessPath: [//url白名单 如果不设置默认都是没权限访问的,会返回{code:401}
    /^\/public/, //公共资源
    /^\/_nuxt/, //nuxt页面
    /^\/login/, //登录
    /^\/favicon.ico/, /^\/__webpack_hmr/, /^\/System/, //系统设置
    /^\/Home/, //主页
    //api部分
    /^\/v1\/api\/common\/getImgValidate/, //验证码
    /^\/v1\/api\/common\/userLoginForSysAdmin/ //登录接口
    ]
};