import { API_SERVER } from './types';
export default {

    /**
     * 获取系统管理员列表
     * @param {*} data
     */
    getSysAdminList: {
        url: `${API_SERVER}/system/getSysAdminList`,
        method: 'get'
    },

    /**
     * 添加系统管理员
     * @param {*} param0
     */
    addSysAdmin: {
        url: `${API_SERVER}/system/addSysAdmin`,
        method: 'post'
    },

    /**
     * 批量删除管理员
     * @param {*} data
     */
    delSysAdminByIds: {
        url: `${API_SERVER}/system/delSysAdminByIds`,
        method: 'delete'
    },

    /**
     * 更新系统管理员
     * @param {*} data
     */
    updateSysAdmin: {
        url: `${API_SERVER}/system/updateSysAdmin`,
        method: 'put'
    },

    /**
     * 获取角色列表
     * @param {*} data
     */
    getSysRoleList: {
        url: `${API_SERVER}/system/getSysRoleList`,
        method: 'get'
    },

    /**
     * 添加系统角色
     * @param {*} param0
     */
    addSysRole: {
        url: `${API_SERVER}/system/addSysRole`,
        method: 'post'
    },

    /**
     * 批量删除角色
     * @param {*} data
     */
    delSysRoleByIds: {
        url: `${API_SERVER}/system/delSysRoleByIds`,
        method: 'delete'
    },

    /**
     * 更新系统角色
     * @param {*} data
     */
    updateSysRole: {
        url: `${API_SERVER}/system/updateSysRole`,
        method: 'put'
    },

    /**
     * 获取权限菜单列表
     * @param {*} data
     */
    getSysPermissionList: {
        url: `${API_SERVER}/system/getSysPermissionList`,
        method: 'get'
    },

    /**
     * 添加权限菜单
     * @param {*} param0
     */
    addSysPermission: {
        url: `${API_SERVER}/system/addSysPermission`,
        method: 'post'
    },

    /**
     * 批量删除权限菜单
     * @param {*} data
     */
    delSysPermissionByIds: {
        url: `${API_SERVER}/system/delSysPermissionByIds`,
        method: 'delete'
    },

    /**
     * 更新系统权限菜单
     * @param {*} data
     */
    updateSysPermission: {
        url: `${API_SERVER}/system/updateSysPermission`,
        method: 'put'
    },

    /**
     * 获取树形菜单
     * @param {*} param0
     */
    getSysPermissionListToTree: {
        url: `${API_SERVER}/system/getSysPermissionListToTree`,
        method: 'get'
    },

    /**
     * 获取角色的权限菜单
     * @param {*} param0
     */
    getSysRolePermissionListToTree: {
        url: `${API_SERVER}/system/getSysRolePermissionListToTree`,
        method: 'get'
    },

    /**
     * 设置角色权限
     * @param {*} data
     */
    setSysRolePermission: {
        url: `${API_SERVER}/system/setSysRolePermission`,
        method: 'put'
    },

    /**
     * 给系统管理员绑定一个角色
     * @param {*} data
     */
    bindSysAdminRole: {
        url: `${API_SERVER}/system/bindSysAdminRole`,
        method: 'put'
    },

    /**
     * 清除角色的所有权限
     * @param {*} data
     */
    clearSysRoleAllPermission: {
        url: `${API_SERVER}/system/clearSysRoleAllPermission`,
        method: 'delete'
    },

    /**
     * 获取系统管理员的基础信息
     * @param {*} param0
     */
    getSysAdminBaseInfo: {
        url: `${API_SERVER}/system/getSysAdminBaseInfo`,
        method: 'get'
    },

    /**
     * 获取角色的菜单列表
     */
    getSysRoleMenusToTree: {
        url: `${API_SERVER}/system/getSysRoleMenusToTree`,
        method: 'get'
    },

    /**
     * 修改系统管理的密码
     * @param {*} data
     */
    updateSysPassword: {
        url: `${API_SERVER}/system/updateSysPassword`,
        method: 'put'
    },

    /**
     * 获取文件列表
     * @param {*} data
     */
    getFiles: {
        url: `${API_SERVER}/common/getFiles`,
        method: 'get'
    },

    /**
     * 批量删除文件
     * @param {*} data
     */
    deleteFiles: {
        url: `${API_SERVER}/common/deleteFiles`,
        method: 'delete'
    }

};
