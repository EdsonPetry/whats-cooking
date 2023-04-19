DROP DATABASE IF EXISTS whats_cooking_db;
CREATE DATABASE whats_cooking_db;
<<<<<<< HEAD

USE whats_cooking_db

CREATE TABLE categories (
    category_name VARCHAR(255) NOT NULL
);

INSERT INTO categories (category_name) VALUES ("recipes"), ("tips"), ("questions");
=======
USE whats_cooking_db;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

DROP DATABASE IF EXISTS whats_cooking_db;
CREATE DATABASE whats_cooking_db;
USE whats_cooking_db
CREATE TABLE categories (
    category_name VARCHAR(255) NOT NULL
);
INSERT INTO categories (category_name) VALUES ("recipes"), ("tips"), ("questions");

>>>>>>> 8ef5e25bc1bc7dec31bfa72be89ddd96ac866723
