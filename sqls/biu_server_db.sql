/*
Navicat MySQL Data Transfer

Source Server         : 本地服务器
Source Server Version : 50714
Source Host           : localhost:3306
Source Database       : biu_server_db

Target Server Type    : MYSQL
Target Server Version : 50714
File Encoding         : 65001

Date: 2019-11-21 15:31:43
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `biu_files_base`
-- ----------------------------
DROP TABLE IF EXISTS `biu_files_base`;
CREATE TABLE `biu_files_base` (
  `fileId` varchar(50) NOT NULL,
  `fileName` varchar(100) DEFAULT NULL,
  `aliasName` varchar(100) DEFAULT NULL,
  `userId` varchar(50) DEFAULT NULL,
  `userName` varchar(100) DEFAULT NULL,
  `size` bigint(20) DEFAULT NULL,
  `type` varchar(100) DEFAULT NULL,
  `suffix` varchar(30) DEFAULT NULL,
  `path` varchar(200) DEFAULT NULL,
  `fileMD5` varchar(40) DEFAULT NULL,
  `status` int(2) DEFAULT NULL,
  `remark` varchar(255) DEFAULT NULL,
  `isDelete` tinyint(1) DEFAULT NULL,
  `createdTime` int(11) DEFAULT NULL,
  `updatedTime` int(11) DEFAULT NULL,
  PRIMARY KEY (`fileId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of biu_files_base
-- ----------------------------

-- ----------------------------
-- Table structure for `sys_admin_base`
-- ----------------------------
DROP TABLE IF EXISTS `sys_admin_base`;
CREATE TABLE `sys_admin_base` (
  `adminId` varchar(255) NOT NULL,
  `adminName` varchar(255) NOT NULL,
  `account` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `status` int(2) DEFAULT NULL,
  `isAdmin` tinyint(1) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `roleName` varchar(255) DEFAULT NULL,
  `roleId` varchar(255) DEFAULT NULL,
  `isDelete` tinyint(1) DEFAULT NULL,
  `createdTime` int(11) DEFAULT NULL,
  `updatedTime` int(11) DEFAULT NULL,
  PRIMARY KEY (`adminId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of sys_admin_base
-- ----------------------------
INSERT INTO `sys_admin_base` VALUES ('84A94F76FFA345E2509FFBAE5195FBBA', '狼宇先森', 'admin', '16A8F9EBF4725F46C38E40C971964E06', null, '1', 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2547219944,305786735&fm=27&gp=0.jpg', '超级管理员', 'A4D975D98ADC07E5F991285E6E221538', '0', '1554519993', '1554519993');

-- ----------------------------
-- Table structure for `sys_permission`
-- ----------------------------
DROP TABLE IF EXISTS `sys_permission`;
CREATE TABLE `sys_permission` (
  `permissionId` varchar(255) NOT NULL,
  `parentId` varchar(255) DEFAULT '0',
  `title` varchar(255) DEFAULT NULL,
  `path` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `component` varchar(255) DEFAULT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `find` int(2) DEFAULT '1',
  `add` int(2) DEFAULT '1',
  `edit` int(2) DEFAULT '1',
  `del` int(2) DEFAULT '1',
  `list` int(2) DEFAULT '1',
  `sort` int(11) DEFAULT NULL,
  `remark` varchar(255) DEFAULT NULL,
  `isDelete` tinyint(1) DEFAULT NULL,
  `createdTime` int(11) DEFAULT NULL,
  `updatedTime` int(11) DEFAULT NULL,
  PRIMARY KEY (`permissionId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of sys_permission
-- ----------------------------
INSERT INTO `sys_permission` VALUES ('20C355945C2947C64927CE77D3DF2B3E', '6A7715BE30B7E36F239081784C91A6DB', '角色管理', 'RolesManage', 'RolesManage', 'RolesManage', null, '0', '0', '0', '0', '0', '602', null, '0', '1554514682', '1554514682');
INSERT INTO `sys_permission` VALUES ('6A7715BE30B7E36F239081784C91A6DB', '0', '系统设置', '/System', 'System', 'System', 'iconfont icon-set', '0', '0', '0', '0', '0', '600', '系统设置模块', '0', '1554512826', '1554512826');
INSERT INTO `sys_permission` VALUES ('80800ABCB00A99F818F8550B473C8C7C', '6A7715BE30B7E36F239081784C91A6DB', '权限管理', 'PermissionManage', 'PermissionManage', 'PermissionManage', null, '0', '0', '0', '0', '0', '603', null, '0', '1554512923', '1554512923');
INSERT INTO `sys_permission` VALUES ('94147C10163735F7BC8848C9586342F3', '6A7715BE30B7E36F239081784C91A6DB', '管理员管理', 'AdminManage', 'AdminManage', 'AdminManage', '', '0', '0', '0', '0', '0', '601', null, '0', '1554514703', '1554514703');

-- ----------------------------
-- Table structure for `sys_roles_auth`
-- ----------------------------
DROP TABLE IF EXISTS `sys_roles_auth`;
CREATE TABLE `sys_roles_auth` (
  `roleId` varchar(255) NOT NULL,
  `permissionId` varchar(255) NOT NULL,
  `parentId` varchar(255) DEFAULT '0',
  `find` int(2) DEFAULT '0',
  `add` int(2) DEFAULT '0',
  `edit` int(2) DEFAULT '0',
  `del` int(2) DEFAULT '0',
  `list` int(2) DEFAULT '0',
  `createdTime` int(11) DEFAULT NULL,
  `updatedTime` int(11) DEFAULT NULL,
  PRIMARY KEY (`roleId`,`permissionId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of sys_roles_auth
-- ----------------------------
INSERT INTO `sys_roles_auth` VALUES ('A4D975D98ADC07E5F991285E6E221538', '20C355945C2947C64927CE77D3DF2B3E', '6A7715BE30B7E36F239081784C91A6DB', '1', '1', '1', '1', '1', '1554618343', '1554618343');
INSERT INTO `sys_roles_auth` VALUES ('A4D975D98ADC07E5F991285E6E221538', '6A7715BE30B7E36F239081784C91A6DB', null, '1', '1', '1', '1', '1', '1554618343', '1554618343');
INSERT INTO `sys_roles_auth` VALUES ('A4D975D98ADC07E5F991285E6E221538', '80800ABCB00A99F818F8550B473C8C7C', '6A7715BE30B7E36F239081784C91A6DB', '1', '1', '1', '1', '1', '1554618343', '1554618343');
INSERT INTO `sys_roles_auth` VALUES ('A4D975D98ADC07E5F991285E6E221538', '94147C10163735F7BC8848C9586342F3', '6A7715BE30B7E36F239081784C91A6DB', '1', '1', '1', '1', '1', '1554618343', '1554618343');

-- ----------------------------
-- Table structure for `sys_roles_base`
-- ----------------------------
DROP TABLE IF EXISTS `sys_roles_base`;
CREATE TABLE `sys_roles_base` (
  `roleId` varchar(255) NOT NULL,
  `roleName` varchar(255) DEFAULT NULL,
  `isDelete` tinyint(1) DEFAULT NULL,
  `createdTime` int(11) DEFAULT NULL,
  `updatedTime` int(11) DEFAULT NULL,
  PRIMARY KEY (`roleId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of sys_roles_base
-- ----------------------------
INSERT INTO `sys_roles_base` VALUES ('A4D975D98ADC07E5F991285E6E221538', '测试人员', '0', '1554512974', '1554512974');
