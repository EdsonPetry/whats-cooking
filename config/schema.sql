DROP DATABASE IF EXISTS whats_cooking_db;
CREATE DATABASE whats_cooking_db;

USE whats_cooking_db

CREATE TABLE categories (
    category_name VARCHAR(255) NOT NULL
);

INSERT INTO categories (category_name) VALUES ("recipes"), ("tips"), ("questions");