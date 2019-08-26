CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
    id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(45),
    department_name VARCHAR(45),
    price INT,
    stock_quantity INT,
    PRIMARY KEY (id)
)

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("4k TV", "Electronics", "800", "5");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Stand Mixer", "Kitchen", "180", "10");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Running Shoes", "Clothing", "100", "4");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Borderlands 3", "Video Games", "55", "6");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("PS4 Controller", "Video Games", "50", "5");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Type C USB Cable", "Electronics", "10", "15");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("IPhone XS Case", "Electronics", "15", "8");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Harry Potter and the Sorcerer's Stone", "Books", "25", "5");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("The Hunger Games", "Books", "15", "5");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Cutting Board", "Kitchen", "30", "8");