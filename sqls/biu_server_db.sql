/*
Navicat MySQL Data Transfer

Source Server         : 本地数据库
Source Server Version : 50714
Source Host           : localhost:3306
Source Database       : biu_server_db

Target Server Type    : MYSQL
Target Server Version : 50714
File Encoding         : 65001

Date: 2019-11-21 22:28:08
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
INSERT INTO `biu_files_base` VALUES ('1C7C5266BB6FCA6B97358FC3910EC2F9', 'QQ图片20190818122830.png', 'BIUXS_WEB_F33889BDA8E4D25AEF6128D9BE9C8A32.png', '84A94F76FFA345E2509FFBAE5195FBBA', '狼宇先森', '1283', 'image/png', 'png', '\\uploads\\20191104\\BIUXS_WEB_F33889BDA8E4D25AEF6128D9BE9C8A32.png', '3A0A7367E42E2DA01114EA19F09DAA3C', null, null, '0', '1574346274', '1574346274');
INSERT INTO `biu_files_base` VALUES ('6B5D084AA133862F0223327AF924359B', 'u=2547219944,305786735&fm=27&gp=0.jpg', 'BIUXS_WEB_69B09D4F1CE6816CEE4E0C5015B9996C.jpg', '84A94F76FFA345E2509FFBAE5195FBBA', '狼宇先森', '37642', 'image/jpeg', 'jpg', '\\uploads\\20191104\\BIUXS_WEB_69B09D4F1CE6816CEE4E0C5015B9996C.jpg', 'F1D2FB9ADECF99A7E71BD1D4B35FE6D7', null, null, '0', '1574344907', '1574344907');
INSERT INTO `biu_files_base` VALUES ('7F3C0432A80B986CDC6188BFD4A39C5A', 'git管理(11).docx', 'BIUXS_WEB_5799C4D0CDD4D838BDA7605B190B37AD.docx', '84A94F76FFA345E2509FFBAE5195FBBA', '狼宇先森', '13592', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'docx', '\\uploads\\20191104\\BIUXS_WEB_5799C4D0CDD4D838BDA7605B190B37AD.docx', '2655A783BD23DAAF515B4DC9A0A14444', null, null, '0', '1574345364', '1574345364');
INSERT INTO `biu_files_base` VALUES ('ACC1219BF5367EA8FE7ABC8FD338F1DD', 'QQ截图20190822194848.png', 'BIUXS_WEB_5C88683F51F31ECBCB6A0803A2FB7A91.png', '84A94F76FFA345E2509FFBAE5195FBBA', '狼宇先森', '2799403', 'image/png', 'png', '\\uploads\\20191104\\BIUXS_WEB_5C88683F51F31ECBCB6A0803A2FB7A91.png', '4C85812791FB9E95989E228D8FA50E47', null, null, '0', '1574346160', '1574346160');
INSERT INTO `biu_files_base` VALUES ('EE912C54D08DBCF9DE1C3278100A1B1F', 'QQ截图20190325221624.png', 'BIUXS_WEB_8870AE4DE174678F7350339627106A95.png', '84A94F76FFA345E2509FFBAE5195FBBA', '狼宇先森', '1592162', 'image/png', 'png', '\\uploads\\20191104\\BIUXS_WEB_8870AE4DE174678F7350339627106A95.png', 'F47C209EE89F2099D960F8E34E99ED85', null, null, '0', '1574345536', '1574345536');

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
INSERT INTO `sys_admin_base` VALUES ('84A94F76FFA345E2509FFBAE5195FBBA', '狼宇先森', 'admin', '16A8F9EBF4725F46C38E40C971964E06', null, '1', '\\uploads\\20191104\\BIUXS_WEB_69B09D4F1CE6816CEE4E0C5015B9996C.jpg', '超级管理员', 'A4D975D98ADC07E5F991285E6E221538', '0', '1554519993', '1554519993');

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
INSERT INTO `sys_permission` VALUES ('C4E0D68694C6FB65C42E217CAA5AFF00', '6A7715BE30B7E36F239081784C91A6DB', '文件管理', 'FilesManage', 'FilesManage', 'FilesManage', null, '0', '0', '0', '0', '0', '604', '文件管理模块,用于管理所有上传在系统里的文件', '0', '1574344851', '1574344851');

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
