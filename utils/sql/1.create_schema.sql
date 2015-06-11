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
-- Table `reminder`.`utilisateur`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `reminder`.`utilisateur` ;

CREATE TABLE IF NOT EXISTS `reminder`.`utilisateur` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `nom` VARCHAR(80) NOT NULL,
  `prenom` VARCHAR(80) NOT NULL,
  `telephone` VARCHAR(20) NULL DEFAULT NULL,
  `mail` VARCHAR(100) NULL DEFAULT NULL,
  `discr` ENUM('candidat','independant','apsidien') NOT NULL,
  `formation` VARCHAR(80) NULL DEFAULT NULL,
  `annees_etudes` INT(11) NULL DEFAULT NULL,
  `competences` VARCHAR(150) NULL DEFAULT NULL,
  `pretentions` INT(11) NULL DEFAULT NULL,
  `mobilite` VARCHAR(45) NULL DEFAULT NULL,
  `remarques` VARCHAR(500) NULL DEFAULT NULL,
  `decision` VARCHAR(80) NULL DEFAULT NULL,
  `source` VARCHAR(80) NULL DEFAULT NULL,
  `date_embauche` DATE NULL DEFAULT NULL,
  `dernier_ese` DATE NULL DEFAULT NULL,
  `prochain_ese` DATE NULL DEFAULT NULL,
  `client_actuel` VARCHAR(80) NULL DEFAULT NULL,
  `dernier_rdv` DATE NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC))
ENGINE = InnoDB
AUTO_INCREMENT = 14
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `reminder`.`rappel`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `reminder`.`rappel` ;

CREATE TABLE IF NOT EXISTS `reminder`.`rappel` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `date_rappel` DATE NOT NULL,
  `date_rdv` DATE NULL DEFAULT NULL,
  `commentaire` VARCHAR(150) NULL DEFAULT NULL,
  `traite` TINYINT(1) NOT NULL DEFAULT '0',
  `utilisateur_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`, `utilisateur_id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `fk_rappel_utilisateur1_idx` (`utilisateur_id` ASC),
  CONSTRAINT `fk_rappel_utilisateur1`
    FOREIGN KEY (`utilisateur_id`)
    REFERENCES `reminder`.`utilisateur` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 10
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
