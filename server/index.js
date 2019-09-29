const ROOT_PATH = process.cwd();
const SRC_PATH = `${ROOT_PATH}/server/src`;
//映射目录别名
require('best-require')(ROOT_PATH, {
    root: ROOT_PATH,
    src: SRC_PATH,
    controllers: `${SRC_PATH}/controllers`,
    models: `${SRC_PATH}/models`,
    routes: `${SRC_PATH}/routes`,
    crawlers: `${SRC_PATH}/crawlers`,
    services: `${SRC_PATH}/services`,
    middleware: `${SRC_PATH}/middleware`,
    lib: `${SRC_PATH}/lib`,
    config: `${SRC_PATH}/config`,
    logs: `${ROOT_PATH}/server/logs`
});
//运行服务
require('./src/bin/Server').run();
