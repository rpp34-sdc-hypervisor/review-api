#!/usr/bin/env bash


# reivews
\copy review from \
    /Users/anuar/Coding/rpp34/review-api/__fixtures__/old_reviews.csv \
    delimiter ',' CSV HEADER;

ALTER TABLE review ALTER COLUMN date TYPE date using to_timestamp(date::decimal);

CAST(to_timestamp(date) AS date)

# photos
\copy photos from /Users/anuar/Coding/rpp34/review-api/__fixtures__/reviews_photos.csv delimiter ',' CSV HEADER;

