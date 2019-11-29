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
# nodejs中使用别名映射,兼容webpack的@和best-require 的:xxx 别名映射

1. 安装库 best-require 进行别名映射

```bash
npm i best-require --save
```

2. 映射别名. 实例在本项目中 server/index.js 中

```javascript
const path = require('path');
const ROOT_PATH = process.cwd();
const SRC_PATH = path.join(ROOT_PATH, `/server/src`);
console.log(ROOT_PATH, SRC_PATH);
//映射目录别名
require('best-require')(ROOT_PATH, {
    root: ROOT_PATH,
    src: SRC_PATH,
    controllers: path.join(SRC_PATH, '/controllers'),
    models: path.join(SRC_PATH, '/models'),
    routes: path.join(SRC_PATH, '/routes'),
    crawlers: path.join(SRC_PATH, '/crawlers'),
    services: path.join(SRC_PATH, '/services'),
    middleware: path.join(SRC_PATH, '/middleware'),
    lib: path.join(SRC_PATH, '/lib'),
    config: path.join(SRC_PATH, '/config'),
    logs: path.join(SRC_PATH, '/logs')
});

//运行服务
require('./src/bin/Server').run();

```

3. 设置 jsconfig.json 

```json
{
    "compilerOptions": {
        "allowSyntheticDefaultImports": true,
        "baseUrl": "./",
        "paths": {
            "@/*": ["client/*"],
            ":root/*": ["*"],
            ":config/*": ["server/src/config/*"],
            ":lib/*": ["server/src/lib/*"],
            ":services/*": ["server/src/services/*"],
            ":controllers/*":["server/src/controllers/*"],
            ":models/*": ["server/src/models/*"],
            ":routes/*": ["server/src/routes/*"],
            ":crawlers/*": ["server/src/crawlers/*"],
            ":middleware/*": ["server/src/middleware/*"],
            ":logs/*": ["server/src/logs/*"]
        }
    },
    "include": ["server/**/*","client/*"],
    "exclude": [
        "node_modules",
        "nuxt-dist",
        "server-dist"
    ]
}
```
4. vscode要安装  path-intellisense 插件

```json
{
    "path-intellisense.mappings": {
        "@": "${workspaceRoot}/client",
        ":root": "${workspaceRoot}",
        ":lib": "${workspaceRoot}/server/src/lib",
        ":controllers": "${workspaceRoot}/server/src/controllers",
        ":models": "${workspaceRoot}/server/src/models",
        ":routes": "${workspaceRoot}/server/src/routes",
        ":crawlers": "${workspaceRoot}/server/src/crawlers",
        ":services": "${workspaceRoot}/server/src/services",
        ":middleware": "${workspaceRoot}/server/src/middleware",
        ":config": "${workspaceRoot}/server/src/config",
        ":logs": "${workspaceRoot}/server/src/logs",
    }
}
```
 
5. 重启vscode,试试看吧!
