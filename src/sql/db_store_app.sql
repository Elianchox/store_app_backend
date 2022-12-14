-- MySQL Script generated by MySQL Workbench
-- Sun Oct  9 15:12:47 2022
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema store_app
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema store_app
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `store_app` DEFAULT CHARACTER SET utf8 ;
USE `store_app` ;

-- -----------------------------------------------------
-- Table `store_app`.`store`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `store_app`.`store` (
  `idstore` VARCHAR(40) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idstore`),
  UNIQUE INDEX `store_id_UNIQUE` (`idstore` ASC) VISIBLE,
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `store_app`.`worker`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `store_app`.`worker` (
  `idworker` VARCHAR(40) NOT NULL,
  `cc_worker` INT NOT NULL,
  `name_worker` VARCHAR(45) NOT NULL,
  `age_worker` INT NOT NULL,
  `fk_idstore` VARCHAR(40) NOT NULL,
  PRIMARY KEY (`idworker`, `fk_idstore`),
  UNIQUE INDEX `id_worker_UNIQUE` (`idworker` ASC) VISIBLE,
  INDEX `fk_worker_store1_idx` (`fk_idstore` ASC) VISIBLE,
  UNIQUE INDEX `cc_worker_UNIQUE` (`cc_worker` ASC) VISIBLE,
  CONSTRAINT `fk_worker_store1`
    FOREIGN KEY (`fk_idstore`)
    REFERENCES `store_app`.`store` (`idstore`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `store_app`.`invoice`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `store_app`.`invoice` (
  `idinvoice` VARCHAR(40) NOT NULL,
  `fk_idstore` VARCHAR(40) NOT NULL,
  `fk_idworker` VARCHAR(40) NOT NULL,
  `invoice_date` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idinvoice`),
  UNIQUE INDEX `invoice_id_UNIQUE` (`idinvoice` ASC) VISIBLE,
  INDEX `fk_invoice_store1_idx` (`fk_idstore` ASC) VISIBLE,
  INDEX `fk_invoice_worker1_idx` (`fk_idworker` ASC) VISIBLE,
  CONSTRAINT `fk_invoice_store1`
    FOREIGN KEY (`fk_idstore`)
    REFERENCES `store_app`.`store` (`idstore`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_invoice_worker1`
    FOREIGN KEY (`fk_idworker`)
    REFERENCES `store_app`.`worker` (`idworker`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `store_app`.`supplier`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `store_app`.`supplier` (
  `idsupplier` VARCHAR(40) NOT NULL,
  `supplier_name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idsupplier`),
  UNIQUE INDEX `supplier_id_UNIQUE` (`idsupplier` ASC) VISIBLE,
  UNIQUE INDEX `supplier_name_UNIQUE` (`supplier_name` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `store_app`.`product`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `store_app`.`product` (
  `idproduct` VARCHAR(40) NOT NULL,
  `product_name` VARCHAR(45) NOT NULL,
  `product_precio` VARCHAR(45) NOT NULL,
  `product_marca` VARCHAR(45) NOT NULL,
  `fk_supplier_id` VARCHAR(40) NOT NULL,
  PRIMARY KEY (`idproduct`, `fk_supplier_id`),
  INDEX `fk_product_supplier_idx` (`fk_supplier_id` ASC) VISIBLE,
  UNIQUE INDEX `product_id_UNIQUE` (`idproduct` ASC) VISIBLE,
  CONSTRAINT `fk_product_supplier`
    FOREIGN KEY (`fk_supplier_id`)
    REFERENCES `store_app`.`supplier` (`idsupplier`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `store_app`.`warehouse`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `store_app`.`warehouse` (
  `idwarehouse` INT NOT NULL,
  `fk_idstore` VARCHAR(40) NOT NULL,
  `fk_idproduct` VARCHAR(40) NOT NULL,
  `warehouse_quantity` INT NULL,
  PRIMARY KEY (`idwarehouse`, `fk_idstore`, `fk_idproduct`),
  UNIQUE INDEX `idwarehouse_UNIQUE` (`idwarehouse` ASC) VISIBLE,
  INDEX `fk_warehouse_store1_idx` (`fk_idstore` ASC) VISIBLE,
  INDEX `fk_warehouse_product1_idx` (`fk_idproduct` ASC) VISIBLE,
  CONSTRAINT `fk_warehouse_store1`
    FOREIGN KEY (`fk_idstore`)
    REFERENCES `store_app`.`store` (`idstore`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_warehouse_product1`
    FOREIGN KEY (`fk_idproduct`)
    REFERENCES `store_app`.`product` (`idproduct`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `store_app`.`detail`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `store_app`.`detail` (
  `detail_num` INT NOT NULL AUTO_INCREMENT,
  `fk_idproduct` VARCHAR(40) NOT NULL,
  `detail_amount` VARCHAR(45) NOT NULL,
  `detail_price` VARCHAR(45) NOT NULL,
  `invoice_idinvoice` VARCHAR(40) NOT NULL,
  INDEX `fk_detail_product1_idx` (`fk_idproduct` ASC) VISIBLE,
  PRIMARY KEY (`detail_num`, `fk_idproduct`),
  INDEX `fk_detail_invoice1_idx` (`invoice_idinvoice` ASC) VISIBLE,
  CONSTRAINT `fk_detail_product1`
    FOREIGN KEY (`fk_idproduct`)
    REFERENCES `store_app`.`product` (`idproduct`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_detail_invoice1`
    FOREIGN KEY (`invoice_idinvoice`)
    REFERENCES `store_app`.`invoice` (`idinvoice`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
