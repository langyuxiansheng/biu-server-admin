# base-nuxt-admin
一套node后台服务框架,自带管理后台页面.基于nuxt,也可以作为纯api服务器使用.移除client及server/src/bin/Server.js 里的 isNuxtRender 覆盖的,然后移除,package.json里nuxt相关包和UI框架即可.

## 目前项目正在完善中......

> API服务器

## Build Setup

``` bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

## 特殊点配置 MD5 加密配置

1. 由 str + _SERVICE.MU.HOME  生成md5 然后转成大写
```
MD5(`${str}_SERVICE.MU.HOME`).toUpperCase();
```

2. 设置数据库配置
```
server/src/lib/sequelize.js  

const config = {
    DB_type: 'mysql', // 数据库类型
    host: 'localhost', // 服务器地址
    port: 3306, // 数据库端口号
    username: 'root', // 数据库用户名
    password: '', // 数据库密码
    database: 'biu_server_db', // 数据库名称
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
};
```


 
