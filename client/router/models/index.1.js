/**
 * nuxt的路由菜单配置
 * @description 仅仅只用用于侧边栏的菜单显示,其它的不做任何功能
 */


export default [{
        path: '/dashboard',
        name: 'dashboard',
        meta: {
            requireAuth: false, //菜单权限
            title: '系统首页', //菜单名
            icon: 'fa fa-bar-chart', //菜单图标
        },
        children: [{
            path: 'welcome',
            meta: {
                title: '欢迎页',
                requireAuth: false
            }
        }]
    },
    {
        path: '/demos',
        name: 'demos',
        meta: {
            requireAuth: false, //菜单权限
            title: '示例功能', //菜单名
            icon: 'fa fa-sitemap', //菜单图标
        },
        children: [{
            path: 'list',
            meta: {
                title: '列表Demo',
                requireAuth: false
            }
        }]
    },
    {
        path: '/system',
        name: 'system',
        meta: {
            requireAuth: false, //菜单权限
            title: '系统管理', //菜单名
            icon: 'fa fa-cog', //菜单图标
        },
        children: [{
                path: 'permission',
                meta: {
                    title: '权限管理',
                    requireAuth: false
                }
            },
            {
                path: 'roleManage',
                meta: {
                    title: '角色管理',
                    requireAuth: false
                }
            },
            {
                path: 'adminManage',
                meta: {
                    title: '管理员管理',
                    requireAuth: false
                },
            }
        ]
    }
];