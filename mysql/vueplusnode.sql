/*
 Navicat MySQL Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 100134
 Source Host           : localhost:3306
 Source Schema         : vueplusnode

 Target Server Type    : MySQL
 Target Server Version : 100134
 File Encoding         : 65001

 Date: 27/06/2024 12:09:40
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for profiles
-- ----------------------------
DROP TABLE IF EXISTS `profiles`;
CREATE TABLE `profiles`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `describe` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `income` int NULL DEFAULT NULL,
  `expend` int NULL DEFAULT NULL,
  `cash` int NULL DEFAULT NULL,
  `remark` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of profiles
-- ----------------------------
INSERT INTO `profiles` VALUES (1, '优惠券', '购买课程', 20, 200, 500, '购买vue全栈课程');
INSERT INTO `profiles` VALUES (3, '提现', '提现存款', 300, 0, 500, '从银行取钱');
INSERT INTO `profiles` VALUES (4, '优惠券', '购买课程', 0, 500, 300, '购买React课程');
INSERT INTO `profiles` VALUES (5, '优惠券', '购物', 0, 300, 200, '淘宝购物');
INSERT INTO `profiles` VALUES (6, '转账', '微信转账', 0, 500, 200, '给朋友转账');
INSERT INTO `profiles` VALUES (7, '充值', '充值', 0, 300, 200, '游戏充值');
INSERT INTO `profiles` VALUES (8, '提现', '领工资', 3000, 0, 3400, '领工资');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `identify` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (7, 'cql666555', '$2b$10$ajvZWOcW0EEfddCs8xQh7.lPGNAr.qH9E1iAuc0FPA2mMheBR6JUm', 'employee');
INSERT INTO `users` VALUES (8, 'admin', '$2b$10$oZblBRJYFDbMJWcsNpJ/E.Z3iZzlWbUk8GFCkJ39ATs.zIykvIwhC', 'manager');

SET FOREIGN_KEY_CHECKS = 1;
