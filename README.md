# bamazon

CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE products(
item_id INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR(100) NOT NULL,
department_name VARCHAR(100) NOT NULL,
price INT(10) NOT NULL,
stock_quantity INT(10) NOT NULL,
PRIMARY KEY (item_id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUE ("Banana", "Produce", 2, 30);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUE ("Frozen Pizza", "Frozen", 18, 10);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUE ("Red Bull", "Beverages", 3, 40);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUE ("Bagel", "Bakery", 2, 12);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUE ("Chocolate", "Candy", 1, 40);