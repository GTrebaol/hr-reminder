-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema reminder
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema reminder
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `reminder` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;
USE `reminder` ;

-- -----------------------------------------------------
-- Table `reminder`.`utilisateur`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `reminder`.`utilisateur` ;

CREATE TABLE IF NOT EXISTS `reminder`.`utilisateur` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nom` VARCHAR(80) NOT NULL,
  `prenom` VARCHAR(80) NOT NULL,
  `telephone` VARCHAR(20) NULL,
  `mail` VARCHAR(100) NULL,
  `discr` ENUM('candidat', 'independant', 'apsidien') NOT NULL,
  `formation` VARCHAR(80) NULL,
  `annees_etudes` INT NULL,
  `competences` VARCHAR(150) NULL,
  `pretentions` INT NULL,
  `mobilite` VARCHAR(45) NULL,
  `remarques` VARCHAR(200) NULL,
  `decision` TINYINT(1) NULL,
  `source` VARCHAR(80) NULL,
  `date_embauche` DATE NULL,
  `dernier_ese` DATE NULL,
  `prochain_ese` DATE NULL,
  `client_actuel` VARCHAR(80) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `reminder`.`rappel`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `reminder`.`rappel` ;

CREATE TABLE IF NOT EXISTS `reminder`.`rappel` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `date_rappel` DATE NOT NULL,
  `date_rdv` DATE NULL,
  `commentaire` VARCHAR(150) NULL,
  `traite` TINYINT(1) NOT NULL DEFAULT 0,
  `utilisateur_id` INT NOT NULL,
  PRIMARY KEY (`id`, `utilisateur_id`),
  INDEX `fk_rappel_utilisateur1_idx` (`utilisateur_id` ASC),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  CONSTRAINT `fk_rappel_utilisateur1`
    FOREIGN KEY (`utilisateur_id`)
    REFERENCES `reminder`.`utilisateur` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
