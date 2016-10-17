-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema questdb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `questdb` ;

-- -----------------------------------------------------
-- Schema questdb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `questdb` DEFAULT CHARACTER SET utf8 ;
USE `questdb` ;

-- -----------------------------------------------------
-- Table `land`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `land` ;

CREATE TABLE IF NOT EXISTS `land` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `description` VARCHAR(255) NULL,
  `image` VARCHAR(255) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `conquest`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `conquest` ;

CREATE TABLE IF NOT EXISTS `conquest` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `foe` VARCHAR(45) NULL,
  `tale` VARCHAR(255) NULL,
  `gold` INT NULL,
  `image` VARCHAR(255) NULL,
  `land_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_conquest_land1_idx` (`land_id` ASC),
  CONSTRAINT `fk_conquest_land1`
    FOREIGN KEY (`land_id`)
    REFERENCES `land` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `loot`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `loot` ;

CREATE TABLE IF NOT EXISTS `loot` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `conquest_id` INT NOT NULL,
  `name` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_loot_conquest_idx` (`conquest_id` ASC),
  CONSTRAINT `fk_loot_conquest`
    FOREIGN KEY (`conquest_id`)
    REFERENCES `conquest` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SET SQL_MODE = '';
GRANT USAGE ON *.* TO questuser;
 DROP USER questuser;
SET SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';
CREATE USER 'questuser' IDENTIFIED BY 'quest';

GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE * TO 'questuser';

-- -----------------------------------------------------
-- Data for table `land`
-- -----------------------------------------------------
START TRANSACTION;
USE `questdb`;
INSERT INTO `land` (`id`, `name`, `description`, `image`) VALUES (1, 'Blighttown', 'As its name suggests, Blighttown is a place of great pestilence. Even the polluted inhabitants of the Depths are aware of its dangers.', 'http://static.giantbomb.com/uploads/original/3/33880/1724829-ds14.jpg');
INSERT INTO `land` (`id`, `name`, `description`, `image`) VALUES (2, 'Sen\'s Fortress', 'Sen\'s Fortress was constructed, to serve as a test for those who wish to enter the City of the Gods, Anor Londo.', 'http://image02.seesaawiki.jp/p/k/project_dark/cd0307b0c7665ec1.jpg');
INSERT INTO `land` (`id`, `name`, `description`, `image`) VALUES (3, 'The Duke\'s Archives', 'The Duke\'s Archives was granted to Seath along with his dukedom by Gwyn as a reward for his assistance in defeating the Everlasting Dragons.', 'http://static.giantbomb.com/uploads/original/10/107718/1724703-dark_souls_040311_13.jpg');
INSERT INTO `land` (`id`, `name`, `description`, `image`) VALUES (4, 'Oolacile', 'Oolacile\'s inhabitants were convinced by a dark serpent to dig up the grave of the Primeval Man. The Abyss was thus unleashed, swallowing the whole of Oolacile.', 'http://i.imgur.com/61oxCb7.png');
INSERT INTO `land` (`id`, `name`, `description`, `image`) VALUES (5, 'Kiln of the First Flame', 'Lord Gwyn sacrificed himself to feed the dying flame in hopes of sustaining the Light. Will it all be for naught?', 'https://2.bp.blogspot.com/-WUxl3-LWMu8/VuHia42-dzI/AAAAAAAABLw/e98rrn6Hzps/s1600/Kiln_of_the_first_flame.jpg');

COMMIT;


-- -----------------------------------------------------
-- Data for table `conquest`
-- -----------------------------------------------------
START TRANSACTION;
USE `questdb`;
INSERT INTO `conquest` (`id`, `foe`, `tale`, `gold`, `image`, `land_id`) VALUES (1, 'Chaos Witch Quelaag', 'Daughter of the Witch of Izalith, now a demon born from the chaos.', 20000, 'http://farm4.staticflickr.com/3688/12262918985_73618f601f_o.jpg', 1);
INSERT INTO `conquest` (`id`, `foe`, `tale`, `gold`, `image`, `land_id`) VALUES (2, 'Iron Golem', 'Guardian of Sen\'s Fortress and slayer of countless heroes seeking Anor Londo.', 40000, 'https://i.ytimg.com/vi/QoV6eedc9E4/maxresdefault.jpg', 2);
INSERT INTO `conquest` (`id`, `foe`, `tale`, `gold`, `image`, `land_id`) VALUES (3, 'Seath the Scaleless', 'The pale white dragon who allied with Lord Gwyn to betray his own.', 60000, 'http://www.doyouevengamebro.net/wp-content/uploads/2016/01/Seath-the-Scaleless-Cinematic.png', 3);
INSERT INTO `conquest` (`id`, `foe`, `tale`, `gold`, `image`, `land_id`) VALUES (4, 'Sanctuary Guardian', 'A white winged lion with the tail of a scorpion. Sanctuary watchkeeper who dreaded the spread of the Abyss.', 30000, 'http://darksouls-portuguese.wiki.fextralife.com/file/view/41_Sanctuary-Guardian_Screenshots_DS_DEADENDTHRILLS.COM.jpg/491820634/1280x640/41_Sanctuary-Guardian_Screenshots_DS_DEADENDTHRILLS.COM.jpg', 4);
INSERT INTO `conquest` (`id`, `foe`, `tale`, `gold`, `image`, `land_id`) VALUES (5, 'Artorias the Abysswalker', 'Knight of Lord Gwyn who was consumed by the Abyss.', 50000, 'https://i.ytimg.com/vi/rgy1TV12LDc/maxresdefault.jpg', 4);
INSERT INTO `conquest` (`id`, `foe`, `tale`, `gold`, `image`, `land_id`) VALUES (6, 'Black Dragon Kalameet', 'One-eyed calamity dragon. Even mighty Anor Londo dared not provoke his ire.', 60000, 'https://i.ytimg.com/vi/8dIWIGGe9PY/maxresdefault.jpg', 4);
INSERT INTO `conquest` (`id`, `foe`, `tale`, `gold`, `image`, `land_id`) VALUES (7, 'Gwyn Lord of Cinder', 'Former Lord of Sunlight who burned as cinder to link the First Flame.', 70000, 'http://2.bp.blogspot.com/-MHztXi-ox7s/UFgSGsiBIGI/AAAAAAAACAU/jtOVA_NY42g/s1600/2012-09-17_00011.jpg', 5);

COMMIT;


-- -----------------------------------------------------
-- Data for table `loot`
-- -----------------------------------------------------
START TRANSACTION;
USE `questdb`;
INSERT INTO `loot` (`id`, `conquest_id`, `name`) VALUES (1, 1, 'Quelaag\'s Furysword');
INSERT INTO `loot` (`id`, `conquest_id`, `name`) VALUES (2, 2, 'Golem Axe');
INSERT INTO `loot` (`id`, `conquest_id`, `name`) VALUES (3, 3, 'Moonlight Greatsword');
INSERT INTO `loot` (`id`, `conquest_id`, `name`) VALUES (4, 4, 'Guardian Tail');
INSERT INTO `loot` (`id`, `conquest_id`, `name`) VALUES (5, 5, 'Abyss Greatsword');
INSERT INTO `loot` (`id`, `conquest_id`, `name`) VALUES (6, 6, 'Obsidian Greatsword');
INSERT INTO `loot` (`id`, `conquest_id`, `name`) VALUES (7, 6, 'Calamity Ring');
INSERT INTO `loot` (`id`, `conquest_id`, `name`) VALUES (8, 7, 'Great Lord Greatsword');
INSERT INTO `loot` (`id`, `conquest_id`, `name`) VALUES (9, 7, 'Sunlight Spear');

COMMIT;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
