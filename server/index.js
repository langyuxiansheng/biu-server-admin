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
