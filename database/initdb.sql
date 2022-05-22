ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'dashboard';
DROP TABLES IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `pseudo` varchar(50) NOT NULL,
  `password` varchar(50) DEFAULT NULL,
  `id_google` varchar(100) DEFAULT NULL,
  `widget` varchar(4096) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARACTER SET utf8;
INSERT INTO `users` VALUES ("1", "paula@paula.en", "Paula", "password",null, null);
INSERT INTO `users` VALUES ("2", "john@denis.en", "John", "password",null, null);
INSERT INTO `users` VALUES ("3", "admin@admin.en", "Paul", "password",null, null);
INSERT INTO `users` VALUES ("4", "admin@valentinbouchet.fr", "Valentin", "password",null, null);