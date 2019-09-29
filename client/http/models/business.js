import { API_SERVER } from './types';
export default {

    /**
     * 获取商家列表
     * @param {*} data
     */
    getBusinessList: {
        url: `${API_SERVER}/business/getBusinessList`,
        method: 'get'
    },

    /**
     * 编辑商家
     */
    updateBusiness: {
        url: `${API_SERVER}/business/updateBusiness`,
        method: 'put'
    },

    /**
     * 创建商家
     */
    addBusinessByAdmin: {
        url: `${API_SERVER}/business/addBusinessByAdmin`,
        method: 'post'
    },

    /**
     * 创建商家
     */
    delBusinessByIds: {
        url: `${API_SERVER}/business/delBusinessByIds`,
        method: 'delete'
    },

    /**
     * 管理平台获取商家店铺列表
     */
    getBusinessShopListByAdmin: {
        url: `${API_SERVER}/shop/getBusinessShopListByAdmin`,
        method: 'get'
    }

};
