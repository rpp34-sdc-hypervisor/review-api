-- DROP DATABASE IF EXISTS atelier;

CREATE DATABASE IF NOT EXISTS atelier;

USE atelier;

CREATE TABLE IF NOT EXISTS review (
  id INT,
  product_id INT,
  rating INT,
  date DATE,
  summary VARCHAR(50),
  body VARCHAR(50),
  recommend VARCHAR(255),
  reported INT,
  reviewer_name VARCHAR(50),
  reviewer_email VARCHAR(50),
  response VARCHAR(255),
  helpfulness INT,
  PRIMARY KEY (id)
)

