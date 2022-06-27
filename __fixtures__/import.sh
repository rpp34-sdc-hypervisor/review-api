#!/usr/bin/env bash


# reivews
\copy reviews from ~/data/reviews.csv delimiter ',' CSV HEADER;

ALTER TABLE review ALTER COLUMN date TYPE date using to_timestamp(date::decimal);

CAST(to_timestamp(date) AS date)

# photos
\copy photos from ~/data/photos.csv delimiter ',' CSV HEADER;

