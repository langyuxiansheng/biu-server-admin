/**
 * Created by Administrator on 2018/1/14 0014.
 * 公共状态模块
 */

//导入公共方法
import config from '@/base/config';

const state = {
    baiDuMapKey: '3GGKnVpSku9u2S17oalzlU6LmYHZoGLy', //百度地图秘钥
    aMapKey: '58d947beaa66523514fdeffe22dd3c59', //高德地图秘钥
    config: config, //配置
    sideBarMenus: null, //侧边栏菜单
    qiNiuToken: null, //七牛token
    routeOptions: [] //路由表
};

export default state;