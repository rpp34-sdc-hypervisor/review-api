-- DROP DATABASE IF EXISTS atelier;

CREATE DATABASE IF NOT EXISTS atelier;

USE atelier;

CREATE TABLE IF NOT EXISTS review (
  id INT,
  product_id INT,
  rating INT,
  date TEXT,
  summary TEXT,
  body TEXT,
  recommend BOOLEAN,
  reported BOOLEAN,
  reviewer_name TEXT,
  reviewer_email TEXT,
  response TEXT,
  helpfulness INT,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS photos (
  id INT,
  review_id INT,
  url TEXT,
  PRIMARY KEY (id),
  CONSTRAINT fk_review
    FOREIGN KEY(review_id)
      REFERENCES reviews(id)
);
