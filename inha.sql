-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema Inha
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema Inha
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `Inha` DEFAULT CHARACTER SET utf8 ;
USE `Inha` ;

-- -----------------------------------------------------
-- Table `Inha`.`Building`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Inha`.`Building` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`Id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Inha`.`Room`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Inha`.`Room` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(10) NOT NULL,
  `Capacity` INT NOT NULL,
  `Building_Id` INT NOT NULL,
  PRIMARY KEY (`Id`, `Building_Id`),
  INDEX `fk_Room_Building1_idx` (`Building_Id` ASC) VISIBLE,
  CONSTRAINT `fk_Room_Building1`
    FOREIGN KEY (`Building_Id`)
    REFERENCES `Inha`.`Building` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Inha`.`Department`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Inha`.`Department` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(30) NOT NULL,
  `Email` VARCHAR(45) NULL,
  `Phone_number` VARCHAR(30) NOT NULL,
  `Building_Id` INT NOT NULL,
  PRIMARY KEY (`Id`),
  INDEX `fk_Department_Building_idx` (`Building_Id` ASC) VISIBLE,
  UNIQUE INDEX `Email_UNIQUE` (`Email` ASC) VISIBLE,
  UNIQUE INDEX `Phone_number_UNIQUE` (`Phone_number` ASC) VISIBLE,
  CONSTRAINT `fk_Department_Building`
    FOREIGN KEY (`Building_Id`)
    REFERENCES `Inha`.`Building` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Inha`.`Class`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Inha`.`Class` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(45) NOT NULL,
  `Professor` VARCHAR(45) NOT NULL,
  `Number_of_participants` INT NOT NULL,
  `Department_Id` INT NOT NULL,
  PRIMARY KEY (`Id`, `Department_Id`),
  INDEX `fk_Class_Department1_idx` (`Department_Id` ASC) VISIBLE,
  CONSTRAINT `fk_Class_Department1`
    FOREIGN KEY (`Department_Id`)
    REFERENCES `Inha`.`Department` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Inha`.`Employee`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Inha`.`Employee` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(20) NOT NULL,
  `Position` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`Id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Inha`.`Student`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Inha`.`Student` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(45) NOT NULL,
  `Email` VARCHAR(45) NOT NULL,
  `Phone_number` VARCHAR(45) NULL,
  `Major` INT NOT NULL,
  `Student_Id` INT NOT NULL,
  `Employee_Id` INT NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE INDEX `Phone number_UNIQUE` (`Phone_number` ASC) VISIBLE,
  UNIQUE INDEX `Email_UNIQUE` (`Email` ASC) VISIBLE,
  INDEX `fk_Student_Employee1_idx` (`Employee_Id` ASC) VISIBLE,
  UNIQUE INDEX `Student_Id_UNIQUE` (`Student_Id` ASC) VISIBLE,
  CONSTRAINT `fk_Student_Employee1`
    FOREIGN KEY (`Employee_Id`)
    REFERENCES `Inha`.`Employee` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Inha`.`Class_has_Room`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Inha`.`Class_has_Room` (
  `Class_Id` INT NOT NULL,
  `Room_Id` INT NOT NULL,
  `Room_Building_Id` INT NOT NULL,
  PRIMARY KEY (`Class_Id`, `Room_Id`, `Room_Building_Id`),
  INDEX `fk_Class_has_Room_Room1_idx` (`Room_Id` ASC, `Room_Building_Id` ASC) VISIBLE,
  INDEX `fk_Class_has_Room_Class1_idx` (`Class_Id` ASC) VISIBLE,
  CONSTRAINT `fk_Class_has_Room_Class1`
    FOREIGN KEY (`Class_Id`)
    REFERENCES `Inha`.`Class` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Class_has_Room_Room1`
    FOREIGN KEY (`Room_Id` , `Room_Building_Id`)
    REFERENCES `Inha`.`Room` (`Id` , `Building_Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Inha`.`Student_has_Class`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Inha`.`Student_has_Class` (
  `Student_Id` INT NOT NULL,
  `Class_Id` INT NOT NULL,
  `Class_Department_Id` INT NOT NULL,
  PRIMARY KEY (`Student_Id`, `Class_Id`, `Class_Department_Id`),
  INDEX `fk_Student_has_Class_Class1_idx` (`Class_Id` ASC, `Class_Department_Id` ASC) VISIBLE,
  INDEX `fk_Student_has_Class_Student1_idx` (`Student_Id` ASC) VISIBLE,
  CONSTRAINT `fk_Student_has_Class_Student1`
    FOREIGN KEY (`Student_Id`)
    REFERENCES `Inha`.`Student` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Student_has_Class_Class1`
    FOREIGN KEY (`Class_Id` , `Class_Department_Id`)
    REFERENCES `Inha`.`Class` (`Id` , `Department_Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Inha`.`Department_has_Student`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Inha`.`Department_has_Student` (
  `Department_Id` INT NOT NULL,
  `Student_Id` INT NOT NULL,
  PRIMARY KEY (`Department_Id`, `Student_Id`),
  INDEX `fk_Department_has_Student_Student1_idx` (`Student_Id` ASC) VISIBLE,
  INDEX `fk_Department_has_Student_Department1_idx` (`Department_Id` ASC) VISIBLE,
  CONSTRAINT `fk_Department_has_Student_Department1`
    FOREIGN KEY (`Department_Id`)
    REFERENCES `Inha`.`Department` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Department_has_Student_Student1`
    FOREIGN KEY (`Student_Id`)
    REFERENCES `Inha`.`Student` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Inha`.`Club`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Inha`.`Club` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(30) NOT NULL,
  `Department_Id` INT NULL,
  `Room_Id` INT NULL,
  `Room_Building_Id` INT NULL,
  PRIMARY KEY (`Id`),
  INDEX `fk_Club_Department1_idx` (`Department_Id` ASC) VISIBLE,
  INDEX `fk_Club_Room1_idx` (`Room_Id` ASC, `Room_Building_Id` ASC) VISIBLE,
  CONSTRAINT `fk_Club_Department1`
    FOREIGN KEY (`Department_Id`)
    REFERENCES `Inha`.`Department` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Club_Room1`
    FOREIGN KEY (`Room_Id` , `Room_Building_Id`)
    REFERENCES `Inha`.`Room` (`Id` , `Building_Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Inha`.`Student_has_Club`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Inha`.`Student_has_Club` (
  `Student_Id` INT NOT NULL,
  `Club_Id` INT NOT NULL,
  PRIMARY KEY (`Student_Id`, `Club_Id`),
  INDEX `fk_Student_has_Club_Club1_idx` (`Club_Id` ASC) VISIBLE,
  INDEX `fk_Student_has_Club_Student1_idx` (`Student_Id` ASC) VISIBLE,
  CONSTRAINT `fk_Student_has_Club_Student1`
    FOREIGN KEY (`Student_Id`)
    REFERENCES `Inha`.`Student` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Student_has_Club_Club1`
    FOREIGN KEY (`Club_Id`)
    REFERENCES `Inha`.`Club` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Inha`.`Department_has_Employee`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Inha`.`Department_has_Employee` (
  `Department_Id` INT NOT NULL,
  `Employee_Id` INT NOT NULL,
  PRIMARY KEY (`Department_Id`, `Employee_Id`),
  INDEX `fk_Department_has_Employee_Employee1_idx` (`Employee_Id` ASC) VISIBLE,
  INDEX `fk_Department_has_Employee_Department1_idx` (`Department_Id` ASC) VISIBLE,
  CONSTRAINT `fk_Department_has_Employee_Department1`
    FOREIGN KEY (`Department_Id`)
    REFERENCES `Inha`.`Department` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Department_has_Employee_Employee1`
    FOREIGN KEY (`Employee_Id`)
    REFERENCES `Inha`.`Employee` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Inha`.`Employee_has_Room`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Inha`.`Employee_has_Room` (
  `Employee_Id` INT NOT NULL,
  `Room_Id` INT NOT NULL,
  `Room_Building_Id` INT NOT NULL,
  PRIMARY KEY (`Employee_Id`, `Room_Id`, `Room_Building_Id`),
  INDEX `fk_Employee_has_Room_Room1_idx` (`Room_Id` ASC, `Room_Building_Id` ASC) VISIBLE,
  INDEX `fk_Employee_has_Room_Employee1_idx` (`Employee_Id` ASC) VISIBLE,
  CONSTRAINT `fk_Employee_has_Room_Employee1`
    FOREIGN KEY (`Employee_Id`)
    REFERENCES `Inha`.`Employee` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Employee_has_Room_Room1`
    FOREIGN KEY (`Room_Id` , `Room_Building_Id`)
    REFERENCES `Inha`.`Room` (`Id` , `Building_Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Inha`.`Employee_has_Class`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Inha`.`Employee_has_Class` (
  `Employee_Id` INT NOT NULL,
  `Class_Id` INT NOT NULL,
  `Class_Department_Id` INT NOT NULL,
  PRIMARY KEY (`Employee_Id`, `Class_Id`, `Class_Department_Id`),
  INDEX `fk_Employee_has_Class_Class1_idx` (`Class_Id` ASC, `Class_Department_Id` ASC) VISIBLE,
  INDEX `fk_Employee_has_Class_Employee1_idx` (`Employee_Id` ASC) VISIBLE,
  CONSTRAINT `fk_Employee_has_Class_Employee1`
    FOREIGN KEY (`Employee_Id`)
    REFERENCES `Inha`.`Employee` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Employee_has_Class_Class1`
    FOREIGN KEY (`Class_Id` , `Class_Department_Id`)
    REFERENCES `Inha`.`Class` (`Id` , `Department_Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;


INSERT INTO `inha`.`building` (`Id`, `Name`) VALUES ('1', '??????????????????');
INSERT INTO `inha`.`building` (`Id`, `Name`) VALUES ('2', '5??????');
INSERT INTO `inha`.`building` (`Id`, `Name`) VALUES ('3', '60???????????????');
INSERT INTO `inha`.`building` (`Id`, `Name`) VALUES ('4', '?????????????????????');
INSERT INTO `inha`.`building` (`Id`, `Name`) VALUES ('5', '?????????');
INSERT INTO `inha`.`building` (`Id`, `Name`) VALUES ('6', '????????????');

INSERT INTO `inha`.`department` (`Id`, `Name`, `Phone_number`, `Building_Id`) VALUES ('1', '?????????????????????', '032-860-7461', '1');
INSERT INTO `inha`.`department` (`Id`, `Name`, `Phone_number`, `Building_Id`) VALUES ('2', '???????????????', '032-860-7460', '3');
INSERT INTO `inha`.`department` (`Id`, `Name`, `Phone_number`, `Building_Id`) VALUES ('3', '???????????????', '032-860-7880', '5');
INSERT INTO `inha`.`department` (`Id`, `Name`, `Phone_number`, `Building_Id`) VALUES ('4', '??????????????????', '032-860-7440', '1');
INSERT INTO `inha`.`department` (`Id`, `Name`, `Phone_number`, `Building_Id`) VALUES ('5', '???????????????', '032-860-7690', '2');

INSERT INTO `inha`.`employee` (`Id`, `Name`, `Position`) VALUES ('1', '?????????', '?????? ??????');
INSERT INTO `inha`.`employee` (`Id`, `Name`, `Position`) VALUES ('2', '?????????', '??????');
INSERT INTO `inha`.`employee` (`Id`, `Name`, `Position`) VALUES ('3', '?????????', '????????????');
INSERT INTO `inha`.`employee` (`Id`, `Name`, `Position`) VALUES ('4', '?????????', '?????? ????????? ??????');
INSERT INTO `inha`.`employee` (`Id`, `Name`, `Position`) VALUES ('5', '?????????', '??????');
INSERT INTO `inha`.`employee` (`Id`, `Name`, `Position`) VALUES ('6', '?????????', '??????');
INSERT INTO `inha`.`employee` (`Id`, `Name`, `Position`) VALUES ('7', '??????', '??????');
INSERT INTO `inha`.`employee` (`Id`, `Name`, `Position`) VALUES ('8', '?????????', '??????');
INSERT INTO `inha`.`employee` (`Id`, `Name`, `Position`) VALUES ('9', '?????????', '????????????');
INSERT INTO `inha`.`employee` (`Id`, `Name`, `Position`) VALUES ('10', '?????????', '??????');
INSERT INTO `inha`.`employee` (`Id`, `Name`, `Position`) VALUES ('11', '?????????', '??????');

INSERT INTO `inha`.`room` (`Id`, `Name`, `Capacity`, `Building_Id`) VALUES ('1', '???-232', '80', '1');
INSERT INTO `inha`.`room` (`Id`, `Name`, `Capacity`, `Building_Id`) VALUES ('2', '???-406', '60', '5');
INSERT INTO `inha`.`room` (`Id`, `Name`, `Capacity`, `Building_Id`) VALUES ('3', '60??????-608', '60', '3');
INSERT INTO `inha`.`room` (`Id`, `Name`, `Capacity`, `Building_Id`) VALUES ('4', '5???110', '50', '2');
INSERT INTO `inha`.`room` (`Id`, `Name`, `Capacity`, `Building_Id`) VALUES ('5', '???-424', '60', '1');
INSERT INTO `inha`.`room` (`Id`, `Name`, `Capacity`, `Building_Id`) VALUES ('6', '5???003', '20', '2');
INSERT INTO `inha`.`room` (`Id`, `Name`, `Capacity`, `Building_Id`) VALUES ('7', '308???', '20', '6');
INSERT INTO `inha`.`room` (`Id`, `Name`, `Capacity`, `Building_Id`) VALUES ('8', '???-511', '5', '1');
INSERT INTO `inha`.`room` (`Id`, `Name`, `Capacity`, `Building_Id`) VALUES ('9', '60??????-801A', '5', '3');
INSERT INTO `inha`.`room` (`Id`, `Name`, `Capacity`, `Building_Id`) VALUES ('10', '5???420', '5', '2');
INSERT INTO `inha`.`room` (`Id`, `Name`, `Capacity`, `Building_Id`) VALUES ('11', '???-1503', '5', '1');

INSERT INTO `inha`.`class` (`Id`, `Name`, `Professor`, `Number_of_participants`, `Department_Id`) VALUES ('1', '???????????????', '?????????', '49', '1');
INSERT INTO `inha`.`class` (`Id`, `Name`, `Professor`, `Number_of_participants`, `Department_Id`) VALUES ('2', '???????????? 2', '?????????', '52', '2');
INSERT INTO `inha`.`class` (`Id`, `Name`, `Professor`, `Number_of_participants`, `Department_Id`) VALUES ('3', '????????????????????????', '?????????', '71', '1');
INSERT INTO `inha`.`class` (`Id`, `Name`, `Professor`, `Number_of_participants`, `Department_Id`) VALUES ('4', '??????', '?????????', '30', '3');
INSERT INTO `inha`.`class` (`Id`, `Name`, `Professor`, `Number_of_participants`, `Department_Id`) VALUES ('5', '?????????????????????', '?????????', '50', '1');

INSERT INTO `inha`.`club` (`Id`, `Name`) VALUES ('1', '????????? ????????????');
INSERT INTO `inha`.`club` (`Id`, `Name`, `Room_Id`, `Room_Building_Id`) VALUES ('2', 'IGRUS', '6', '2');
INSERT INTO `inha`.`club` (`Id`, `Name`, `Department_Id`) VALUES ('3', '????????????', '2');
INSERT INTO `inha`.`club` (`Id`, `Name`, `Room_Id`, `Room_Building_Id`) VALUES ('4', '????????????', '7', '6');
INSERT INTO `inha`.`club` (`Id`, `Name`, `Department_Id`) VALUES ('5', 'CTP', '4');

INSERT INTO `inha`.`student` (`Id`, `Name`, `Email`, `Phone_number`, `Major`, `Student_Id`, `Employee_Id`) VALUES ('1', '?????????', 'wlsdk9803@inha.edu', '010-1234-5678', '1', '12181780', '5');
INSERT INTO `inha`.`student` (`Id`, `Name`, `Email`, `Phone_number`, `Major`, `Student_Id`, `Employee_Id`) VALUES ('2', '?????????', 'dbrud@inha.edu', '010-1235-7864', '4', '12191654', '7');
INSERT INTO `inha`.`student` (`Id`, `Name`, `Email`, `Phone_number`, `Major`, `Student_Id`, `Employee_Id`) VALUES ('3', '?????????', 'eunseo@inha.edu', '010-5672-1345', '5', '12201375', '8');
INSERT INTO `inha`.`student` (`Id`, `Name`, `Email`, `Phone_number`, `Major`, `Student_Id`, `Employee_Id`) VALUES ('4', '?????????', 'sojung@inha.edu', '010-7410-8523', '2', '12201986', '6');
INSERT INTO `inha`.`student` (`Id`, `Name`, `Email`, `Phone_number`, `Major`, `Student_Id`, `Employee_Id`) VALUES ('5', '?????????', 'sunhee@inha.edu', '010-9635-7856', '1', '12181885', '2');

INSERT INTO `inha`.`class_has_room` (`Class_Id`, `Room_Id`, `Room_Building_Id`) VALUES ('1', '5', '1');
INSERT INTO `inha`.`class_has_room` (`Class_Id`, `Room_Id`, `Room_Building_Id`) VALUES ('2', '4', '2');
INSERT INTO `inha`.`class_has_room` (`Class_Id`, `Room_Id`, `Room_Building_Id`) VALUES ('3', '1', '1');
INSERT INTO `inha`.`class_has_room` (`Class_Id`, `Room_Id`, `Room_Building_Id`) VALUES ('3', '5', '1');
INSERT INTO `inha`.`class_has_room` (`Class_Id`, `Room_Id`, `Room_Building_Id`) VALUES ('4', '2', '5');
INSERT INTO `inha`.`class_has_room` (`Class_Id`, `Room_Id`, `Room_Building_Id`) VALUES ('5', '1', '1');

INSERT INTO `inha`.`department_has_student` (`Department_Id`, `Student_Id`) VALUES ('1', '1');
INSERT INTO `inha`.`department_has_student` (`Department_Id`, `Student_Id`) VALUES ('1', '5');
INSERT INTO `inha`.`department_has_student` (`Department_Id`, `Student_Id`) VALUES ('2', '4');
INSERT INTO `inha`.`department_has_student` (`Department_Id`, `Student_Id`) VALUES ('4', '2');
INSERT INTO `inha`.`department_has_student` (`Department_Id`, `Student_Id`) VALUES ('5', '3');

INSERT INTO `inha`.`student_has_class` (`Student_Id`, `Class_Id`, `Class_Department_Id`) VALUES ('1', '1', '1');
INSERT INTO `inha`.`student_has_class` (`Student_Id`, `Class_Id`, `Class_Department_Id`) VALUES ('4', '2', '2');
INSERT INTO `inha`.`student_has_class` (`Student_Id`, `Class_Id`, `Class_Department_Id`) VALUES ('2', '4', '3');
INSERT INTO `inha`.`student_has_class` (`Student_Id`, `Class_Id`, `Class_Department_Id`) VALUES ('1', '4', '3');
INSERT INTO `inha`.`student_has_class` (`Student_Id`, `Class_Id`, `Class_Department_Id`) VALUES ('5', '5', '1');
INSERT INTO `inha`.`student_has_class` (`Student_Id`, `Class_Id`, `Class_Department_Id`) VALUES ('3', '1', '1');
INSERT INTO `inha`.`student_has_class` (`Student_Id`, `Class_Id`, `Class_Department_Id`) VALUES ('3', '2', '2');

INSERT INTO `inha`.`department_has_employee` (`Department_Id`, `Employee_Id`) VALUES ('1', '1');
INSERT INTO `inha`.`department_has_employee` (`Department_Id`, `Employee_Id`) VALUES ('1', '2');
INSERT INTO `inha`.`department_has_employee` (`Department_Id`, `Employee_Id`) VALUES ('1', '5');
INSERT INTO `inha`.`department_has_employee` (`Department_Id`, `Employee_Id`) VALUES ('1', '11');
INSERT INTO `inha`.`department_has_employee` (`Department_Id`, `Employee_Id`) VALUES ('2', '4');
INSERT INTO `inha`.`department_has_employee` (`Department_Id`, `Employee_Id`) VALUES ('2', '6');
INSERT INTO `inha`.`department_has_employee` (`Department_Id`, `Employee_Id`) VALUES ('2', '10');
INSERT INTO `inha`.`department_has_employee` (`Department_Id`, `Employee_Id`) VALUES ('3', '9');
INSERT INTO `inha`.`department_has_employee` (`Department_Id`, `Employee_Id`) VALUES ('4', '7');
INSERT INTO `inha`.`department_has_employee` (`Department_Id`, `Employee_Id`) VALUES ('5', '3');
INSERT INTO `inha`.`department_has_employee` (`Department_Id`, `Employee_Id`) VALUES ('5', '8');

INSERT INTO `inha`.`employee_has_class` (`Employee_Id`, `Class_Id`, `Class_Department_Id`) VALUES ('1', '3', '1');
INSERT INTO `inha`.`employee_has_class` (`Employee_Id`, `Class_Id`, `Class_Department_Id`) VALUES ('2', '3', '1');
INSERT INTO `inha`.`employee_has_class` (`Employee_Id`, `Class_Id`, `Class_Department_Id`) VALUES ('5', '5', '1');
INSERT INTO `inha`.`employee_has_class` (`Employee_Id`, `Class_Id`, `Class_Department_Id`) VALUES ('9', '4', '3');
INSERT INTO `inha`.`employee_has_class` (`Employee_Id`, `Class_Id`, `Class_Department_Id`) VALUES ('11', '1', '1');
INSERT INTO `inha`.`employee_has_class` (`Employee_Id`, `Class_Id`, `Class_Department_Id`) VALUES ('10', '2', '2');

INSERT INTO `inha`.`employee_has_room` (`Employee_Id`, `Room_Id`, `Room_Building_Id`) VALUES ('2', '8', '1');
INSERT INTO `inha`.`employee_has_room` (`Employee_Id`, `Room_Id`, `Room_Building_Id`) VALUES ('6', '9', '3');
INSERT INTO `inha`.`employee_has_room` (`Employee_Id`, `Room_Id`, `Room_Building_Id`) VALUES ('7', '11', '1');
INSERT INTO `inha`.`employee_has_room` (`Employee_Id`, `Room_Id`, `Room_Building_Id`) VALUES ('8', '10', '2');

INSERT INTO `inha`.`student_has_club` (`Student_Id`, `Club_Id`) VALUES ('1', '1');
INSERT INTO `inha`.`student_has_club` (`Student_Id`, `Club_Id`) VALUES ('4', '1');
INSERT INTO `inha`.`student_has_club` (`Student_Id`, `Club_Id`) VALUES ('5', '2');
INSERT INTO `inha`.`student_has_club` (`Student_Id`, `Club_Id`) VALUES ('4', '3');
INSERT INTO `inha`.`student_has_club` (`Student_Id`, `Club_Id`) VALUES ('1', '4');
INSERT INTO `inha`.`student_has_club` (`Student_Id`, `Club_Id`) VALUES ('2', '5');

alter table student add Password varchar(20);
alter table student modify Student_Id varchar(20) not null;
update inha.student set Password = 'mypw1234' where Id = '1';
update inha.student set Password = 'pass1234' where Id = '2';
update inha.student set Password = 'pwpw1234' where Id = '3';

alter table class add Extra_seat int;
update inha.class set Extra_seat = '1' where Id = '1';
update inha.class set Extra_seat = '8' where Id = '2';
update inha.class set Extra_seat = '4' where Id = '3';
update inha.class set Extra_seat = '5' where Id = '4';
update inha.class set Extra_seat = '0' where Id = '5';
