import apis from './wrapper';
export const {
    userLoginForSysAdmin,
    getImgValidate,
    //系统设置
    getSysAdminList,
    addSysAdmin,
    delSysAdminByIds,
    updateSysAdmin,
    getSysRoleList,
    addSysRole,
    delSysRoleByIds,
    updateSysRole,
    getSysPermissionList,
    addSysPermission,
    delSysPermissionByIds,
    updateSysPermission,
    getSysPermissionListToTree,
    getSysRolePermissionListToTree,
    setSysRolePermission,
    bindSysAdminRole,
    clearSysRoleAllPermission,
    getSysAdminBaseInfo,
    getSysRoleMenusToTree,
    updateSysPassword,
    getFiles,
    deleteFiles,
    getSysLogList
    //555
} = apis;
