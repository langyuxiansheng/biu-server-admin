/*
Navicat MySQL Data Transfer

Source Server         : 本地服务器
Source Server Version : 50714
Source Host           : localhost:3306
Source Database       : biu_server_db

Target Server Type    : MYSQL
Target Server Version : 50714
File Encoding         : 65001

Date: 2019-09-30 11:02:26
*/

SET FOREIGN_KEY_CHECKS=0;

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
INSERT INTO `sys_permission` VALUES ('046CD05B7B14F61CD206825BE65F985E', '8C076E2C14DA4926674F615CE07C3D08', '爬取错误/遗漏', 'ProgressError', 'ProgressError', 'ProgressError', null, '0', '0', '0', '0', '0', '503', '爬取错误页面管理', '1', '1555236984', '1555236984');
INSERT INTO `sys_permission` VALUES ('0A299B606D8B3C1D32F7E18386A046DC', 'E2DE9C727D919E364A238A87F7942F00', '书籍标签', 'TagsManage', 'TagsManage', 'TagsManage', null, '0', '0', '0', '0', '0', null, null, '1', '1554818777', '1554818777');
INSERT INTO `sys_permission` VALUES ('20C355945C2947C64927CE77D3DF2B3E', '6A7715BE30B7E36F239081784C91A6DB', '角色管理', 'RolesManage', 'RolesManage', 'RolesManage', null, '0', '0', '0', '0', '0', '602', null, '0', '1554514682', '1554514682');
INSERT INTO `sys_permission` VALUES ('218CF50F9D3E9E806522A6BB80F0FD24', '48E7B0E0AFD48A3B53C3085A1CC747DD', '商家列表', 'BusinessManage', 'BusinessManage', 'BusinessManage', null, '0', '0', '0', '0', '0', null, '这里是所有的商家', '0', '1569328353', '1569328353');
INSERT INTO `sys_permission` VALUES ('48E7B0E0AFD48A3B53C3085A1CC747DD', '0', '商家管理', '/Business', 'Business', 'Business', 'iconfont icon-26', '0', '0', '0', '0', '0', null, '商家管理模块', '0', '1569328298', '1569328298');
INSERT INTO `sys_permission` VALUES ('5995A080A423D742FD1A49FA2E88768B', 'E2DE9C727D919E364A238A87F7942F00', '书籍分类', 'ClassifyManage', 'ClassifyManage', 'ClassifyManage', null, '0', '0', '0', '0', '0', null, null, '1', '1554903751', '1554903751');
INSERT INTO `sys_permission` VALUES ('6A7715BE30B7E36F239081784C91A6DB', '0', '系统设置', '/System', 'System', 'System', 'iconfont icon-set', '0', '0', '0', '0', '0', '600', '系统设置模块', '0', '1554512826', '1554512826');
INSERT INTO `sys_permission` VALUES ('80800ABCB00A99F818F8550B473C8C7C', '6A7715BE30B7E36F239081784C91A6DB', '权限管理', 'PermissionManage', 'PermissionManage', 'PermissionManage', null, '0', '0', '0', '0', '0', '603', null, '0', '1554512923', '1554512923');
INSERT INTO `sys_permission` VALUES ('8C076E2C14DA4926674F615CE07C3D08', '0', '爬虫设置', '/Crawler', 'Crawler', 'Crawler', 'iconfont icon-pachongxitong', '0', '0', '0', '0', '0', '500', '书城系统的爬虫配置', '1', '1555234809', '1555234809');
INSERT INTO `sys_permission` VALUES ('90A7CFF3C2BB9640F2C0DA5288A8AA65', '8C076E2C14DA4926674F615CE07C3D08', '搜书爬取', 'SearchBook', 'SearchBook', 'SearchBook', null, '0', '0', '0', '0', '0', '505', '搜索书籍然后爬取', '1', '1555237138', '1555237138');
INSERT INTO `sys_permission` VALUES ('94147C10163735F7BC8848C9586342F3', '6A7715BE30B7E36F239081784C91A6DB', '管理员管理', 'AdminManage', 'AdminManage', 'AdminManage', '', '0', '0', '0', '0', '0', '601', null, '0', '1554514703', '1554514703');
INSERT INTO `sys_permission` VALUES ('B9A1A48977E22F9D78A2C335E5480D1E', 'E2DE9C727D919E364A238A87F7942F00', '书籍管理', 'BooksManage', 'BooksManage', 'BooksManage', null, '0', '0', '0', '0', '0', null, null, '1', '1554735858', '1554735858');
INSERT INTO `sys_permission` VALUES ('CF6BA5ACB64AD451C2D045C7E73F10CD', '8C076E2C14DA4926674F615CE07C3D08', '代理IP管理', 'IPManage', 'IPManage', 'IPManage', null, '0', '0', '0', '0', '0', '501', null, '1', '1555234914', '1555234914');
INSERT INTO `sys_permission` VALUES ('D90BC5A81F13982890C68771A623FF33', '8C076E2C14DA4926674F615CE07C3D08', '爬取进度', 'ProgressManage', 'ProgressManage', 'ProgressManage', null, '0', '0', '0', '0', '0', '504', '爬虫爬取进度', '1', '1555237043', '1555237043');
INSERT INTO `sys_permission` VALUES ('E2DE9C727D919E364A238A87F7942F00', '0', '书城系统', '/EBook', 'EBook', 'EBook', 'iconfont icon-dianzishucheng', '0', '0', '0', '0', '0', '0', 'Biu电子书城管理系统', '1', '1554735652', '1554735652');
INSERT INTO `sys_permission` VALUES ('E9A944598C0FC28D1563F760CDD4C4C2', '8C076E2C14DA4926674F615CE07C3D08', '书籍来源管理', 'BookSourceManage', 'BookSourceManage', 'BookSourceManage', null, '0', '0', '0', '0', '0', '502', '书城系统爬取的来源配置', '1', '1555425111', '1555425111');

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
