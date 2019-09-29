// /**
//  * nuxt的路由菜单配置
//  * @description 仅仅只用于侧边栏的菜单显示和权限,其它的不做任何功能
//  */
// const menus = [{
//         meta: {
//             requireAuth: false, //菜单权限
//             title: '系统首页', //菜单名
//             icon: 'fa fa-bar-chart' //菜单图标
//         },
//         path: '/dashboard',
//         name: 'dashboard'
//     },
//     {
//         meta: {
//             requireAuth: false, //菜单权限
//             title: '欢迎页' //菜单名
//         },
//         path: 'Welcome',
//         name: 'dashboard-Welcome'
//     },
//     {
//         meta: {
//             requireAuth: false, //菜单权限
//             title: '示例功能', //菜单名
//             icon: 'fa fa-bar-chart' //菜单图标
//         },
//         path: '/demos',
//         name: 'demos'
//     },
//     {
//         meta: {
//             requireAuth: false, //菜单权限
//             title: '列表Demo' //菜单名
//         },
//         path: 'List',
//         name: 'demos-List'
//     },
//     {
//         meta: {
//             requireAuth: false, //菜单权限
//             title: '列表详情' //菜单名
//         },
//         path: 'List/Detail/:id?',
//         name: 'demos-List-Detail-id'
//     },
//     {
//         meta: {
//             requireAuth: false, //菜单权限
//             title: '数据分析', //菜单名
//             icon: 'fa fa-bar-chart' //菜单图标
//         },
//         path: '/datas/UserAnalysis',
//         name: 'datas-UserAnalysis'
//     },
//     {
//         path: '/',
//         name: 'index'
//     }
//     // {
//     //     meta: {
//     //         requireAuth: false, //菜单权限
//     //         title: '系统管理', //菜单名
//     //         icon: 'fa fa-cog', //菜单图标
//     //     },
//     //     path: "/datas/UserAnalysis",
//     //     name: "datas-UserAnalysis"
//     // },
//     /*     {
//             path: '/system',
//             name: 'system',
//             meta: {
//                 requireAuth: false, //菜单权限
//                 title: '系统管理', //菜单名
//                 icon: 'fa fa-cog', //菜单图标
//             },
//             children: [{
//                     path: 'permission',
//                     meta: {
//                         title: '权限管理',
//                         requireAuth: false
//                     }
//                 },
//                 {
//                     path: 'roleManage',
//                     meta: {
//                         title: '角色管理',
//                         requireAuth: false
//                     }
//                 },
//                 {
//                     path: 'adminManage',
//                     meta: {
//                         title: '管理员管理',
//                         requireAuth: false
//                     },
//                 }
//             ]
//         } */
// ];

// /**
//  * 递归查询路由权限
//  * @param {*} list
//  * @param {*} menu
//  */
// const iterator = (list) => {
//     for (let item in list) {
//         for (const m in menus) {
//             if ((list[item].name === menus[m].name) && (list[item].path === menus[m].path)) {
//                 console.log((list[item].name === menus[m].name) && (list[item].path === menus[m].path));
//                 list[item].meta = menus[m].meta;
//                 list[item].meta.requireAuth = true;
//             }
//         }
//         if (list[item].children && list[item].children.length > 0) {
//             iterator(list[item].children);
//         } else {
//             return list;
//         };
//     }
// };

// export default (routes, resolve) => {
//     // console.log(routes);
//     // routes.push({ path: '/api', name: '4168486' }, );
//     routes = iterator(routes);
//     // console.log(routes);
// };



// // module.exports = (routes, resolve) => {
// //     // console.log(routes);
// //     // routes.push({ path: '/api', name: '4168486' }, );
// //     routes = iterator(routes);
// //     console.log(routes);
// // }