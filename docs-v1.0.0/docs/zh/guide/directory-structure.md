#### 目录结构
---
```javascript {1-999}
 biu-server-admin
 |-- dist                             // 项目构建(webpack)输出目录
 |-- public                           // 项目构建公共资源文件
 |-- src                              // 源码目录
 |   |-- assets                       // 项目资源文件目录
 |   |   |-- fonts                    // 项目字体资源文件存放目录
 |   |   |-- imgs                     // 项目图片资源文件存放目录
 |   |   |-- scripts                  // 项目第三方脚本文件存放目录
 |   |   |-- styles                   // 项目样式文件资源
 |   |   
 |   |-- common                       // 项目公共方法留存目录
 |   |   |-- base                     // 项目基础参数配置 与运行环境无关
 |   |   |-- method                   // 项目公共工具类
 |   |   
 |   |-- components                   // vue公共组件
 |   |   |-- Apptables                // 数据表格组件
 |   |   |-- AppTableUtils            // 表格工具条组件
 |   |   |-- CardContainer            // 视图容器组件
 |   |   |-- DialogContainer          // 弹出层组件
 |   |   |-- ImgDialog                // 图片预览弹出层组件
 |   |   |-- InfoSelectDialogForm     // 讯息公共选择组件
 |   |   |-- Layout                   // 项目主容器框架结构组件
 |   |   |-- LineProgress             // 自定义进度条数据可视化组件
 |   |   |-- Maps                     // 项目公共地图组件
 |   |   |-- MidContainer             // 中间件容器组件
 |   |   |-- ScrollPane               // 标签导航公共组件
 |   |   |-- SubjectSelectDialogForm  // 商家主体选择组件
 |   |   |-- TableUtil                // 表格工具栏组件(可能用不上了)
 |   |   |-- TreeTable                // 树形表格组件
 |   |   |-- UserSelectDialogForm     // 用户选择组件
 |   |  
 |   |-- filters                      // vue项目全局过滤器模块
 |   |-- http                         // vue项目网络请求拦截器(ajax模块)
 |   |-- router                       // vue项目路由
 |   |-- store                        // vuex的状态管理器
 |   |-- views                        // view视图层
 |   |   |-- consult                  // 投诉留言
 |   |   |-- home                     // 主页
 |   |   |-- illegal                  // 违法查处
 |   |   |-- information              // 信息发布
 |   |   |-- layout                   // 结构组件(包括header sidebar ...)
 |   |   |-- Login                    // 登陆系统
 |   |   |-- market                   // 市场主体
 |   |   |-- patrolInspection         // 巡查抽检
 |   |   |-- system                   // 系统管理
 |   |  
 |   |-- App.vue                      // 页面入口文件
 |   |-- main.js                      // 程序入口文件，加载各种公共组件
 |  
 |-- .babelrc                         // ES6语法编译配置
 |-- .editorconfig                    // 定义代码格式
 |-- .gitignore                       // git上传需要忽略的文件格式
 |-- .eslintignore                    // eslint要忽略的文件
 |-- .eslintrc.js                     // eslint的配置文件
 |-- .postcssrc                       // css抽离提取出来模块化的配置文件
 |-- babel.config.js                  // babel的配置文件
 |-- element-variables                // 主题变量配置文件
 |-- README.md                        // 项目说明
 |-- vue.config.js                    // vue脚手架配置文件
 |-- package.json                     // 依赖包文件
```
