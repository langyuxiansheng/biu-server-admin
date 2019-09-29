/**
 * 路由鉴权中间件
 * @description 配置侧边栏菜单和权限使用
 */
// import menus from '@/router';

/**
 * 递归查询路由权限
 * @param {*} list
 * @param {*} menu
 */
/* const iterator = (list) => {
    for (let item in list) {
        for (const m in menus) {
            if ((list[item].name === menus[m].name) && (list[item].path === menus[m].path)) {
                console.log((list[item].name === menus[m].name) && (list[item].path === menus[m].path));
                list[item].meta = menus[m].meta;
                list[item].meta.requireAuth = true;
            }
        }
        if (list[item].children && list[item].children.length > 0) {
            iterator(list[item].children);
        } else {
            return list;
        };
    }
}; */
export default ({ app }) => {
    // console.log(`路由鉴权中间件`, app.router.options);
    //let routes = app.router.options.routes;
    //app.router.options.routes = iterator(routes);
    // console.log(iterator);
    return app;
};