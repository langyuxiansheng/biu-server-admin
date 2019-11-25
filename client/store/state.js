/**
 * Created by Administrator on 2018/1/14 0014.
 * 公共状态模块
 */

//导入公共方法
import config from '@/base/config';
const state = {
    config: config, //配置
    permission: [] //权限数组
};

export default state;
