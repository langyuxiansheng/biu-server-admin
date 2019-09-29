import { API_SERVER } from './types';
export default {

    /**
     * 获取图片验证码
     * @param {*} data
     */
    getImgValidate: {
        url: `${API_SERVER}/common/getImgValidate`,
        method: 'get'
    },

    /**
     * 系统用户登录
     * @param {*} data
     */
    userLoginForSysAdmin: {
        url: `${API_SERVER}/common/userLoginForSysAdmin`,
        method: 'post'
    }
};
