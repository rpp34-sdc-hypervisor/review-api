-- DROP DATABASE IF EXISTS atelier;

CREATE DATABASE IF NOT EXISTS atelier;

USE atelier;

CREATE TABLE IF NOT EXISTS reviews (
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


# index review_id column in photos table
CREATE INDEX review_id_index ON photos
(
    review_id
);

CREATE INDEX product_id_index ON reviews
(
    product_id
);