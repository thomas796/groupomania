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
  KEY `fk_comment_user_idx` (`userId`),
  KEY `Fk_postId_idx` (`postId`),
  CONSTRAINT `Fk_postId` FOREIGN KEY (`postId`) REFERENCES `posts` (`idposts`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=161 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (158,56,43,'two one'),(159,56,43,'two two');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `likes` (
  `userId` int NOT NULL,
  `postId` int NOT NULL,
  `likeup` tinyint NOT NULL DEFAULT '0',
  `likedown` tinyint NOT NULL DEFAULT '0',
  `likeId` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`likeId`),
  UNIQUE KEY `likeId_UNIQUE` (`likeId`),
  KEY `Fk_likePostId_idx` (`postId`),
  KEY `Fk_likeUserId_idx` (`userId`),
  CONSTRAINT `Fk_likePostId` FOREIGN KEY (`postId`) REFERENCES `posts` (`idposts`) ON DELETE CASCADE,
  CONSTRAINT `Fk_likeUserId` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
INSERT INTO `likes` VALUES (43,56,0,1,9);
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
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
  KEY `fk_post_user_idx` (`userId`),
  CONSTRAINT `FK_postsuser` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (56,'','première publication',43);
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
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (2,'yoyo','$2b$10$zt1/KsqdUYV8SEBbfS4qZ.uthkdeO34kPtJU5KsjUnbZmU2MFx3S.','','yoyouuo@gmail.com','','',0),(3,'roro','$2b$10$Hk6Lo03TeGapvMXJ1JP1Xu5PWZLHLmspQIxEDi3lStGB5dzPc/q86','44','roro@gmail.com','informatique','http://localhost:3001/images/muscles.png1607723432917.png',0),(4,'riri','$2b$10$MyyMml.4pFqA1e6euPYstOhIUuWEfFT1ZacPwDvFXHku/Pg6Qi41e','55','riri@gmail.com','hdjdj','http://localhost:3001/images/Untitled_presentation.png1607817488029.png',0),(39,'Administrateur','$2b$10$WgbICwNAL1e36mlVJ8kQ2efruqWMlob.JEpcHjddox6ZvSrzoyFoS','27','administrateur@gmail.com','Développement','http://localhost:3001/images/anonyme.png1608107914114.png',1),(43,'testuser','$2b$10$nM5..LfGOga9rQ1nKdvRf.YitrQQf8nIms5GrVpPeiUcFYe6bpur2','','testuser@gmail.com','','',0);
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

-- Dump completed on 2020-12-16 20:31:06
