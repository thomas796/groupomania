-- MySQL dump 10.13  Distrib 8.0.22, for macos10.15 (x86_64)
--
-- Host: localhost    Database: Groupomania
-- ------------------------------------------------------
-- Server version	8.0.22

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `idComment` int NOT NULL AUTO_INCREMENT,
  `postId` int NOT NULL,
  `userId` int NOT NULL,
  `comment` varchar(255) NOT NULL,
  PRIMARY KEY (`idComment`),
  KEY `fk_comment_user_idx` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=145 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (1,4,0,'comment r'),(2,0,0,'rereerrere'),(3,0,0,'jjjkkjkjjk'),(4,0,0,'jjjkkjkjjk'),(5,0,0,'vccvvcvc'),(6,0,0,'moche'),(7,0,0,'tr&egrave;s jolie'),(8,0,0,'dfffdfdfd'),(9,0,0,'dodfpofdp'),(10,1,0,'uyuyuyuyuy'),(11,1,0,'uyuyuyuyuypppp'),(12,0,0,'fdsfdsfdssdf'),(13,0,0,'fdsfdsfdssdf'),(14,1,0,'sfdfdsfdsfsd'),(15,1,0,'sfdfdsfdsfsdfd'),(16,1,0,'je ne pense pas que ce soit top'),(17,1,0,'C&apos;est incroyable'),(18,0,0,'C&apos;est g&eacute;nial'),(19,0,0,'dssddsdssd'),(20,0,0,'dssddsdssdsdlkdsklkds'),(21,0,0,'dssddsdssdsdlkdsklkdssd,,;ds,;ds,;sd'),(22,0,0,'gfgfddfgfdg'),(23,0,0,'gfgfddfgfdgdgfgfdgfd'),(24,0,0,'gfgfddfgfdgdgfgfdgfddfggfgdf'),(25,0,0,'gfdgfdgfd'),(26,0,0,'gfdgfdgfdgffgd'),(27,0,0,'gfdgfdgfdgffgd'),(28,0,0,'gfdgfdgfdgffgdfdggfd'),(29,0,0,'gfdgfdgfdgffgdfdggfd'),(30,0,0,'gfdgfdgfdgffgdfdggfd'),(31,0,0,'gfdgfdgfdgffgdfdggfd'),(32,0,0,'gfdgfdgfdgffgdfdggfd'),(33,0,0,'gfdgfdgfdgffgdfdggfd'),(34,0,0,'fgdgfdgfd'),(35,0,0,'fgdgfdgfdfgfd'),(36,0,0,'fgdgfdgfdfgfd'),(37,0,0,'fdsfdsfds'),(38,0,0,'fdsfdsfds'),(39,0,0,'fdsfdsfds'),(40,0,0,'fdsfdsfds'),(41,0,0,'fdsfdsfds'),(42,0,0,'dfggdf'),(43,0,0,'dsdskldkslkldskds'),(44,0,0,'dsdskldkslkldskdsd'),(45,0,0,'zeezezezezez'),(46,0,0,'zeezezezezez'),(47,0,0,'dsdsddds'),(48,0,0,'fddffdfd'),(49,0,0,'kjjkjkjkj'),(50,0,0,'kjjkjkjkj,hkkjkjkjk'),(51,0,0,'jjkjkjkjk'),(52,0,0,'jjkjkkjjk'),(53,0,0,'jjkjkkjjk'),(54,0,0,'jhjhjsdfdfds'),(55,0,0,'fdsfdsfsdfs'),(56,0,0,'jhjhj'),(57,0,0,'jlkklmklmklmklm'),(58,0,0,'n,n,n,,n'),(59,1,0,'jhjhj'),(60,1,0,'lkklkllk'),(61,0,0,'jkjkjlkjkl'),(62,0,0,'wxcwxcxcxw'),(63,0,0,'ccx'),(64,0,0,'sdflkfdsklfds'),(65,0,0,'kldfskldsf'),(66,0,0,'dfskjfd'),(67,0,0,'fdsfds'),(68,0,0,'fdsfdsfsd'),(69,0,0,'dffdsfddfsdffddfs'),(70,0,0,'dsdfslm'),(71,0,0,'dfsmfds'),(72,0,0,'dssdds'),(73,0,0,'sddsdssd'),(74,0,0,'nouveau commentaire'),(75,0,0,'encore une slskl'),(76,0,0,'djfkfdj'),(77,1,0,'rerezze'),(78,0,0,'ldkqsklqmsdklmqds'),(79,0,0,'dskkdls'),(80,8,0,'jjjjlkjkl'),(81,8,0,'jjjjlkjkl'),(82,20,0,'heuuu'),(83,0,0,'hjhskqdhkjsdhjkds'),(84,0,0,'hjhskqdhkjsdhjkds'),(85,0,0,'skjskldjlksd'),(86,24,0,'sddssdds'),(87,24,0,'cococ'),(88,24,0,'jkjkljlk'),(89,24,0,'fdsfsd'),(90,24,0,'sdfdsdffdsfsdfdfsdfdsfsd'),(91,24,0,'dfklkldfklfd'),(92,24,0,'dfklkldfklfd'),(93,24,0,'sddsdsd'),(94,24,0,'sddsdsd'),(95,24,0,'dsds'),(96,24,0,'dsdsdsddsds'),(97,22,0,'vxcvcvcxvxc'),(98,22,0,'vxcvcvcxvxccxvxvccvx'),(99,20,0,'dsdsklkdls'),(100,11,0,'comment'),(101,24,0,'fdfd'),(102,24,0,'cxcxcxcx'),(103,24,0,'fdsfdsfds'),(104,23,0,'vxccvxvxc'),(105,20,0,'fdfdfd'),(106,21,0,'groupomania'),(107,24,0,'cxwcxc'),(108,23,0,'sdfdsfsfd'),(109,23,0,'fdfffddf'),(110,24,4,'dfdffd'),(111,24,4,'ffdfdfdfd'),(112,23,4,'fdfdfd'),(113,23,4,'jkjkjk'),(114,24,4,'fdfd'),(115,24,4,'ffdffdfdfd'),(116,23,4,'kslddkklsd'),(117,23,4,'dsklsdkdlsklsdkdsl'),(118,12,4,'nouveau commentaire'),(119,11,4,'super sauce'),(120,24,4,'dfssdffdsfdsdfs'),(121,7,4,'dffdffd'),(122,25,4,'sdsdds'),(123,16,4,'sdffdsfdsdfs'),(124,25,4,'fdfsdfdsfsd'),(125,31,4,'fdsdfsdfdfs'),(126,28,4,'test'),(127,31,0,'titi in the game'),(128,30,0,'Yes'),(129,4,5,'fsdfdfsdfdfsdfsd'),(130,6,38,'j&apos;arrive'),(131,6,38,'j&apos;arrive je suis nouveau'),(132,6,38,'hi new test'),(133,3,38,'belle machine'),(134,31,38,'sdffsdsdf'),(135,28,38,'dfgdfgd'),(136,28,38,'gfdfgdfgd'),(137,28,38,'fgfgd'),(138,29,38,'fgdfdgfgdfdg'),(139,29,38,'fgfdggfdfgdfg'),(140,31,38,'cxwcxwcxwcxw'),(141,32,38,'jjjkjkljkljk'),(142,6,38,'lkl'),(143,30,38,'xcvxcvcvx'),(144,32,39,'ededed');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `idposts` int NOT NULL AUTO_INCREMENT,
  `urlimage` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `userId` int NOT NULL,
  PRIMARY KEY (`idposts`),
  KEY `fk_post_user_idx` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (3,'http://localhost:3001/images/bic_(1).png1607722656228.png','rererere',3),(4,'http://localhost:3001/images/homePicture.jpg1607725924548.jpg','hueueueu',3),(5,'http://localhost:3001/images/homePicture.jpg1607725955336.jpg','yeye',3),(6,'http://localhost:3001/images/homePicture.jpg1607725957697.jpg','yeye',3),(7,'http://localhost:3001/images/homePicture.jpg1607725958727.jpg','yeye',3),(21,'http://localhost:3001/images/logo.png1607818053154.png','fffddf',4),(25,'http://localhost:3001/images/logo.png1607989994181.png','gfgfgghhhg',4),(26,'http://localhost:3001/images/homePicture.jpg1607991436982.jpg','dffdfdfdfdfd',4),(27,'http://localhost:3001/images/anonyme.png1607991528767.png','',4),(28,'','dfdfffd',4),(29,'http://localhost:3001/images/logo.png1607991696094.png','fdfddfdf',4),(30,'','j\'écris un text',4),(31,'','dsfsdfdsfdsfsd',4),(32,'','ddffddffd',4);
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT 'anonyme',
  `password` varchar(255) NOT NULL DEFAULT 'password',
  `age` varchar(45) DEFAULT '',
  `mail` varchar(45) NOT NULL DEFAULT '',
  `department` varchar(45) DEFAULT '',
  `profilimage` varchar(255) DEFAULT '',
  `isadministrator` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `mail_UNIQUE` (`mail`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (2,'yoyo','$2b$10$zt1/KsqdUYV8SEBbfS4qZ.uthkdeO34kPtJU5KsjUnbZmU2MFx3S.','','yoyouuo@gmail.com','','',0),(3,'roro','$2b$10$Hk6Lo03TeGapvMXJ1JP1Xu5PWZLHLmspQIxEDi3lStGB5dzPc/q86','44','roro@gmail.com','informatique','http://localhost:3001/images/muscles.png1607723432917.png',0),(4,'riri','$2b$10$MyyMml.4pFqA1e6euPYstOhIUuWEfFT1ZacPwDvFXHku/Pg6Qi41e','55','riri@gmail.com','hdjdj','http://localhost:3001/images/Untitled_presentation.png1607817488029.png',0),(38,'testuser','$2b$10$N4IL.7bVOaUCQlmIp./sGOqkn77PK4/nzHC0n24UzJGTstSk1Sa9K','27','testuser@gmail.com','informatique','http://localhost:3001/images/Capture_d’écran_2020-12-15_à_16.48.40.png1608069683578.png',0),(39,'Administrateur','$2b$10$WgbICwNAL1e36mlVJ8kQ2efruqWMlob.JEpcHjddox6ZvSrzoyFoS','27','administrateur@gmail.com','Développement','http://localhost:3001/images/anonyme.png1608107914114.png',1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-12-16 11:19:18
