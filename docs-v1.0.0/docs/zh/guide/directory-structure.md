### 目录结构

---

```bash
 biu-server-admin                     // 源码根目录
 |-- client
 |   |-- assets                       // 项目资源文件
 |   |   |-- images                   // 项目图片
 |   |   |-- scripts                  // 项目第三方脚本目录
 |   |   |-- styles                   // 项目全局样式及样式常量
 |   |
 |   |-- base                   // 管理后台全局配置
 |   |-- components                   // vue公共组件
 |   |-- filters                   // vue公共组件
 |   |-- http                   // vue公共组件
 |   |   |__ models                   // 项目API接口模块化目录
 |   |   |__ index.js                   // 项目API接口声明及输出
 |   |                    // 项目API接口模块化目录
 |   |-- layouts                   // nuxt默认布局模板目录
 |   |-- lib                   // 管理后台常用工具库
 |   |-- middleware                   // ssr渲染的时候中间件目录
 |   |-- pages                   // 管理后台页面组件目录
 |   |-- plugins                   // 管理后台插件目录
 |   |__ store                   // vuex目录
 |       |-- models                   // 项目vuex模块化目录
 |       |__ index.js                   // 项目vuex模块输出
 |  
 |-- dist                             // 项目构建(webpack)静态网站输出目录
 |-- docs-v1.0.0                      // 项目构建DOCS文档目录
 |-- nuxt-dist                        // 项目后台打包输出目录
 |-- server                           // 项目服务端源码主目录.
 |   |-- src                         // 项目服务端源码目录
 |   |  |-- bin                   // 服务端Server初始化目录
 |   |  |-- config                   // 服务端全局配置文件目录
 |   |  |-- controllers                   // 服务端路由控制器目录
 |   |  |  |-- models                   // 服务端路由文件模块化目录
 |   |  |  |  |-- common                   // 公共路由,无需token即可调用的接口
 |   |  |  |  |  |-- FilesController.js    // 文件接口路由
 |   |  |  |  |  |-- LoginController.js    // 登录接口路由
 |   |  |  |  |  |-- UtilsController.js    // 工具接口路由
 |   |  |  |  |-- system                   // 系统路由
 |   |  |  |     |-- AdminController.js    // 管理员管理接口路由
 |   |  |  |     |-- LogsController.js       //  系统日志接口路由
 |   |  |  |     |-- PermissionController.js  // 权限管理接口路由
 |   |  |  |     |-- RolesController.js  // 角色管理接口路由
 |   |  |  |  
 |   |  |  |__ index.js                 // 控制器导出目录
 |   |  |
 |   |  |-- lib                   // 服务端依赖包及工具目录
 |   |  |  |-- Email.js                   // 邮件类工具
 |   |  |  |-- FileUtils.js                   // 文件管理的工具
 |   |  |  |-- logger4.js                   // 日志工具
 |   |  |  |-- Result.js                   // 统一数据返回工具
 |   |  |  |-- sequelize.js                   // 数据库ORM工具
 |   |  |  |-- userAgents.js                   // 代理头
 |   |  |  |-- Utils.js                   // 工具类
 |   |  |
 |   |  |-- logs                   // 服务端日志文件输出目录(具体的目录见lib/logger4.js的配置注释)
 |   |  |-- middleware                   // 服务端中间件目录
 |   |  |  |-- ErrorRoutesCatch.js       // 统一错误捕获中间件,koa中间存放目录
 |   |  |
 |   |  |-- models                   // 数据库数据模型存放目录
 |   |  |  |-- common                   // 系统路由
 |   |  |  |  |-- FilesBaseModel.js    // 文件表数据模型
 |   |  |  |  |-- RegionModel.js       //  地址表数据模型
 |   |  |  |
 |   |  |  |-- system                   // 系统路由
 |   |  |     |-- AdminBaseModel.js    // 系统用户表数据模型
 |   |  |     |-- PermissionModel.js       // 系统权限表数据模型
 |   |  |     |-- RolesAuthModel.js       //  角色权限中间表数据模型
 |   |  |     |-- RolesBaseModel.js       // 系统角色表数据模型
 |   |  |
 |   |  |-- public                   // 服务端静态文件存放目录
 |   |  |  |-- 20191104                   //文件上传生成的目录
 |   |  |  |-- tmp                   //文件上传临时存储的目录
 |   |  |  
 |   |  |-- services                   // 服务端业务代码存放目录
 |   |     |-- common                   //公共业务逻辑目录
 |   |     |  |-- FilesService.js    // 文件业务逻辑类
 |   |     |  |-- LoginService.js    // 登录逻辑类
 |   |     |  |-- UtilsService.js    // 工具逻辑类
 |   |     |
 |   |     |-- system                   //系统业务逻辑目录
 |   |        |-- AdminService.js    // 文件业务逻辑类
 |   |        |-- LogsService.js    // 文件业务逻辑类
 |   |        |-- PermissionService.js    //权限逻辑类
 |   |        |-- RolesService.js    // 文件业务逻辑类
 |   |
 |   |__ index.js                       // 服务端启动文件
 |
 |-- server-dist                      // 项目服务端构建代码输出目录product
 |-- sqls                             // 项目SQL文件目录
 |-- .babelrc                         // ES6语法编译配置
 |-- .editorconfig                    // 定义代码格式
 |-- .gitignore                       // git上传需要忽略的文件格式
 |-- .eslintignore                    // eslint要忽略的文件
 |-- .eslintrc.js                     // eslint的配置文件
 |-- .postcssrc                       // css抽离提取出来模块化的配置文件
 |-- README.md                        // 项目说明
 |-- package.json                     // 依赖包文件
```
