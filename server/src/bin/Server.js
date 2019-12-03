const Koa2 = require('koa'); //koa
const KoaCors = require('koa-cors'); //核心文件
const KoaBody = require('koa-body'); //koa文件上传
const koaJWT = require('koa-jwt'); //jwt生成解析
const koaStatic = require('koa-static'); //静态文件
const responseTime = require('koa-response-time');
const consola = require('consola'); //打印
const { Nuxt, Builder } = require('nuxt'); //nuxt渲染框架
const config = require(':config/server.base.config'); //配置文件
const nuxtConfig = require(':root/nuxt.config'); //nuxt配置文件
const controllers = require(':controllers/index'); //路由入口
const ErrorRoutesCatch = require(':middleware/ErrorRoutesCatch'); //全局错误捕获
const { accessLogger } = require(':lib/logger4'); //日志系统
const app = new Koa2();
const host = process.env.HOST || config.host || '127.0.0.1';
const port = process.env.PORT || config.port || 3000;
config.dev = !(app.env === 'production');
module.exports = class Server {
    static async run() {
        const nuxt = new Nuxt(nuxtConfig);
        if (config.isNuxtRender) {
            if (config.dev) {
                const builder = new Builder(nuxt);
                await builder.build();
            }
        }
        app.use(accessLogger());
        app.use(responseTime({ hrtime: true }));
        app.use(KoaCors());
        app.use(ErrorRoutesCatch);
        app.use(koaStatic(config.staticPath));
        app.use(KoaBody({
            multipart: true,
            strict: false,
            formidable: {
                uploadDir: config.uploadDir, //设置上传缓存文件夹
                maxFileSize: 1024 * 1024 * 10 * 1024 // 设置上传文件大小最大限制，默认1G 1024M
            },
            jsonLimit: '10mb',
            formLimit: '10mb',
            textLimit: '10mb'
        }));
        app.use(koaJWT({ secret: config.jwtPublicKey }).unless({ path: config.unlessPath })); //jwt 注入
        app.use(controllers.routes()); //路由注入
        app.use(controllers.allowedMethods());
        if (config.isNuxtRender) {
            app.use(ctx => {
                ctx.status = 200;
                return new Promise((resolve, reject) => {
                    ctx.res.on('close', resolve);
                    ctx.res.on('finish', resolve);
                    nuxt.render(ctx.req, ctx.res, promise => {
                        console.log(`Nuxt 渲染完成!`);
                        promise.then(resolve).catch(reject);
                    });
                });
            });
        }
        app.listen(port, host);
        consola.ready({
            message: `Server listening on http://${host}:${port}/login`,
            badge: true
        });
    }
};
