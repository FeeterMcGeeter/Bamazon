CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
    id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(45),
    department_name VARCHAR(45),
    price INT NOT NULL,
    stock_quantity
)