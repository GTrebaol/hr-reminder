-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema reminder
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema reminder
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `reminder` DEFAULT CHARACTER SET utf8 ;
USE `reminder` ;

-- -----------------------------------------------------
-- Table `reminder`.`customer`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `reminder`.`customer` ;

CREATE TABLE IF NOT EXISTS `reminder`.`customer` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `label` VARCHAR(80) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `reminder`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `reminder`.`user` ;

CREATE TABLE IF NOT EXISTS `reminder`.`user` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `nom` VARCHAR(80) NOT NULL,
  `prenom` VARCHAR(80) NOT NULL,
  `telephone` VARCHAR(20) NULL DEFAULT NULL,
  `mail` VARCHAR(100) NULL DEFAULT NULL,
  `age` INT(100) NULL DEFAULT NULL,
  `discr` ENUM('candidat','independant','ancien consultant') NOT NULL,
  `formation` VARCHAR(80) NULL DEFAULT NULL,
  `annees_experience` INT(11) NULL DEFAULT NULL,
  `pretention` INT(11) NULL DEFAULT NULL,
  `mobilite` VARCHAR(45) NULL DEFAULT NULL,
  `remarques` VARCHAR(100) NULL DEFAULT NULL,
  `source` VARCHAR(80) NULL DEFAULT NULL,
  `date_embauche` DATE NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC))
ENGINE = InnoDB
AUTO_INCREMENT = 15
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `reminder`.`interview`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `reminder`.`interview` ;

CREATE TABLE IF NOT EXISTS `reminder`.`interview` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `remarques` VARCHAR(400) NOT NULL,
  `decision` VARCHAR(50) NULL,
  `date` DATE NOT NULL,
  `user_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_interview_user1_idx` (`user_id` ASC),
  CONSTRAINT `fk_interview_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `reminder`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `reminder`.`reminder`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `reminder`.`reminder` ;

CREATE TABLE IF NOT EXISTS `reminder`.`reminder` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `date_rappel` DATE NOT NULL,
  `date_rdv` DATE NULL DEFAULT NULL,
  `commentaire` VARCHAR(150) NULL DEFAULT NULL,
  `traite` TINYINT(1) NOT NULL DEFAULT '0',
  `user_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`, `user_id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `fk_rappel_user1_idx` (`user_id` ASC),
  CONSTRAINT `fk_rappel_utilisateur1`
    FOREIGN KEY (`user_id`)
    REFERENCES `reminder`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 9
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `reminder`.`skill`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `reminder`.`skill` ;

CREATE TABLE IF NOT EXISTS `reminder`.`skill` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `label` VARCHAR(80) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `reminder`.`user_has_customer`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `reminder`.`user_has_customer` ;

CREATE TABLE IF NOT EXISTS `reminder`.`user_has_customer` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `user_id` INT(11) NOT NULL,
  `customer_id` INT(11) NOT NULL,
  `date_debut` DATE NOT NULL,
  `date_fin` DATE NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_user_has_customer_customer1_idx` (`customer_id` ASC),
  INDEX `fk_user_has_customer_user1_idx` (`user_id` ASC),
  CONSTRAINT `fk_user_has_customer_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `reminder`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_has_customer_customer1`
    FOREIGN KEY (`customer_id`)
    REFERENCES `reminder`.`customer` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `reminder`.`user_has_skill`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `reminder`.`user_has_skill` ;

CREATE TABLE IF NOT EXISTS `reminder`.`user_has_skill` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT(11) NOT NULL,
  `skill_id` INT(11) NOT NULL,
  INDEX `fk_user_has_skill_skill1_idx` (`skill_id` ASC),
  INDEX `fk_user_has_skill_user1_idx` (`user_id` ASC),
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_user_has_skill_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `reminder`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_has_skill_skill1`
    FOREIGN KEY (`skill_id`)
    REFERENCES `reminder`.`skill` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
