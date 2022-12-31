-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema Car_Dealer
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema Car_Dealer
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `Car_Dealer` DEFAULT CHARACTER SET utf8 ;
USE `Car_Dealer` ;

-- -----------------------------------------------------
-- Table `Car_Dealer`.`vehicle`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Car_Dealer`.`vehicle` (
  `Vin` INT NOT NULL,
  `Price` VARCHAR(45) NOT NULL,
  `Model` VARCHAR(45) NOT NULL,
  `License_plate` VARCHAR(45) NOT NULL,
  `reservation_availability` VARCHAR(5) NOT NULL,
  `type` VARCHAR(5) NOT NULL,
  PRIMARY KEY (`Vin`),
  UNIQUE INDEX `License_plate_UNIQUE` (`License_plate` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Car_Dealer`.`car`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Car_Dealer`.`car` (
  `Engine_size` VARCHAR(45) NOT NULL,
  `vehicle_Vin` INT NOT NULL,
  PRIMARY KEY (`vehicle_Vin`),
  INDEX `fk_car_vehicle_idx` (`vehicle_Vin` ASC) VISIBLE,
  CONSTRAINT `fk_car_vehicle`
    FOREIGN KEY (`vehicle_Vin`)
    REFERENCES `Car_Dealer`.`vehicle` (`Vin`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Car_Dealer`.`truck`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Car_Dealer`.`truck` (
  `Tonnage` VARCHAR(45) NOT NULL,
  `vehicle_Vin` INT NOT NULL,
  PRIMARY KEY (`vehicle_Vin`),
  INDEX `fk_truck_vehicle1_idx` (`vehicle_Vin` ASC) VISIBLE,
  CONSTRAINT `fk_truck_vehicle1`
    FOREIGN KEY (`vehicle_Vin`)
    REFERENCES `Car_Dealer`.`vehicle` (`Vin`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Car_Dealer`.`suv`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Car_Dealer`.`suv` (
  `No_seats` VARCHAR(45) NOT NULL,
  `vehicle_Vin` INT NOT NULL,
  PRIMARY KEY (`vehicle_Vin`),
  INDEX `fk_suv_vehicle1_idx` (`vehicle_Vin` ASC) VISIBLE,
  CONSTRAINT `fk_suv_vehicle1`
    FOREIGN KEY (`vehicle_Vin`)
    REFERENCES `Car_Dealer`.`vehicle` (`Vin`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Car_Dealer`.`salesperson`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Car_Dealer`.`salesperson` (
  `sid` CHAR(9) NOT NULL,
  `name` VARCHAR(15) NOT NULL,
  PRIMARY KEY (`sid`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Car_Dealer`.`customer`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Car_Dealer`.`customer` (
  `Ssn` CHAR(9) NOT NULL,
  `name` VARCHAR(15) NOT NULL,
  `State` VARCHAR(45) NULL,
  `Street` VARCHAR(45) NULL,
  `City` VARCHAR(45) NULL,
  `userId` VARCHAR(15) NOT NULL,
  `password` VARCHAR(15) NOT NULL,
  PRIMARY KEY (`Ssn`),
  UNIQUE INDEX `userId_UNIQUE` (`userId` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Car_Dealer`.`reservation`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Car_Dealer`.`reservation` (
  `reservation_date` DATE NOT NULL,
  `vehicle_Vin` INT NOT NULL,
  `salesperson_sid` CHAR(9) NOT NULL,
  `customer_Ssn` CHAR(9) NOT NULL,
  PRIMARY KEY (`vehicle_Vin`, `salesperson_sid`, `customer_Ssn`),
  INDEX `fk_sale_status_vehicle1_idx` (`vehicle_Vin` ASC) VISIBLE,
  INDEX `fk_sale_status_salesperson1_idx` (`salesperson_sid` ASC) VISIBLE,
  INDEX `fk_sale_status_customer1_idx` (`customer_Ssn` ASC) VISIBLE,
  CONSTRAINT `fk_sale_status_vehicle1`
    FOREIGN KEY (`vehicle_Vin`)
    REFERENCES `Car_Dealer`.`vehicle` (`Vin`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_sale_status_salesperson1`
    FOREIGN KEY (`salesperson_sid`)
    REFERENCES `Car_Dealer`.`salesperson` (`sid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_sale_status_customer1`
    FOREIGN KEY (`customer_Ssn`)
    REFERENCES `Car_Dealer`.`customer` (`Ssn`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Car_Dealer`.`admin`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Car_Dealer`.`admin` (
  `admin_id` VARCHAR(15) NOT NULL,
  `password` VARCHAR(15) NOT NULL,
  `name` VARCHAR(15) NOT NULL,
  PRIMARY KEY (`admin_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Car_Dealer`.`sold_out`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Car_Dealer`.`sold_out` (
  `soldout_date` DATE NOT NULL,
  `vehicle_Vin` INT NOT NULL,
  `salesperson_sid` CHAR(9) NOT NULL,
  `customer_Ssn` CHAR(9) NOT NULL,
  PRIMARY KEY (`vehicle_Vin`, `salesperson_sid`, `customer_Ssn`),
  INDEX `fk_sold_out_salesperson1_idx` (`salesperson_sid` ASC) VISIBLE,
  INDEX `fk_sold_out_customer1_idx` (`customer_Ssn` ASC) VISIBLE,
  CONSTRAINT `fk_sold_out_vehicle1`
    FOREIGN KEY (`vehicle_Vin`)
    REFERENCES `Car_Dealer`.`vehicle` (`Vin`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_sold_out_salesperson1`
    FOREIGN KEY (`salesperson_sid`)
    REFERENCES `Car_Dealer`.`salesperson` (`sid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_sold_out_customer1`
    FOREIGN KEY (`customer_Ssn`)
    REFERENCES `Car_Dealer`.`customer` (`Ssn`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;


INSERT INTO `car_dealer`.`admin` (`admin_id`, `password`, `name`) VALUES ('admin1234', 'adpw1234', '관리자');
INSERT INTO `car_dealer`.`customer` (`Ssn`, `name`, `State`, `Street`, `City`, `userId`, `password`) VALUES ('123456789', 'Jina', 'Texas', '555 Rose', 'Houston', 'jina3344', 'mypw1234');
INSERT INTO `car_dealer`.`customer` (`Ssn`, `name`, `State`, `Street`, `City`, `userId`, `password`) VALUES ('345567881', 'John', 'Texas', '3321 Castle', 'Spring', 'john1234', 'jhjh1234');
INSERT INTO `car_dealer`.`customer` (`Ssn`, `name`, `State`, `Street`, `City`, `userId`, `password`) VALUES ('989765432', 'James', 'Texas', '291 Berry', 'Bellaire', 'james1234', 'jmjm1234');
INSERT INTO `car_dealer`.`customer` (`Ssn`, `name`, `State`, `Street`, `City`, `userId`, `password`) VALUES ('554433771', 'Frank', 'Texas', '5631 Rice', 'Houston', 'fran1234', 'frfr1234');
INSERT INTO `car_dealer`.`customer` (`Ssn`, `name`, `State`, `Street`, `City`, `userId`, `password`) VALUES ('77412365', 'Judy', 'Texas', '975 Fire Oak', 'Humble', 'judy1234', 'juju1222');
INSERT INTO `car_dealer`.`salesperson` (`sid`, `name`) VALUES ('224455786', 'Sarah');
INSERT INTO `car_dealer`.`salesperson` (`sid`, `name`) VALUES ('137954624', 'Rily');
INSERT INTO `car_dealer`.`salesperson` (`sid`, `name`) VALUES ('870960555', 'Joyce');
INSERT INTO `car_dealer`.`salesperson` (`sid`, `name`) VALUES ('111555999', 'Alicia');
INSERT INTO `car_dealer`.`salesperson` (`sid`, `name`) VALUES ('888666444', 'Franklin');

create view login as (select admin_id as userId, password, name from admin) union all (select userId, password, name from customer);
create view reservation_detail as select Vin, Model, type, Price, License_plate, salesperson_sid, customer_Ssn, reservation_date from reservation, vehicle where vehicle_Vin=Vin;
create view sold_out_detail as select Vin, Model, type, Price, License_plate, salesperson_sid, customer_Ssn, soldout_date from sold_out, vehicle where vehicle_Vin=Vin;

-- 경로 수정
source C:/Users/wlsdk/Desktop/database/final project/createVehicle.sql;
delete from truck where vehicle_Vin='703772906';

create index ssn_index on sold_out(customer_Ssn);
create index ssn_index on reservation(customer_Ssn);
create index ssn_index on customer(Ssn);
create index type_index on vehicle(type);
