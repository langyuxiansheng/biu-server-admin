/**
 * Created by Administrator on 2018/1/12 0012.
 * store 公共方法类
 */

//导入公共状态模块

const getters = {
    //配置文件
    config: state => state.config,
    //权限
    permission: state => state.permission

};

export default getters;
