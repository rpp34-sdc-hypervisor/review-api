
/* reads up to 100 reviews */
BEGIN;
EXPLAIN ANALYZE SELECT "reviews".*, "photos"."id" AS "photos.id", "photos"."review_id" AS "photos.review_id", "photos"."url" AS "photos.url", "photos"."review_id" AS "photos.reviewId" FROM (SELECT "reviews"."id", "reviews"."product_id", "reviews"."rating", "reviews"."date", "reviews"."summary", "reviews"."body", "reviews"."recommend", "reviews"."reported", "reviews"."reviewer_name", "reviews"."reviewer_email", "reviews"."response", "reviews"."helpfulness" FROM "reviews" AS "reviews" WHERE "reviews"."product_id" = '71719' LIMIT 100) AS "reviews" LEFT OUTER JOIN "photos" AS "photos" ON "reviews"."id" = "photos"."review_id";
ROLLBACK;

/* 
    1. send requests from FE
        a. updates, etc
    2. copy corresponding queries in BE logs
    3. paste those queries here. Use above as an example, i.e.
        ```
            BEGIN;
            EXPLAIN ANALYZE {copied query};
            ROLLBACK;
        ```
    4. run ```npm run stresstestdb``` from the console
    5. see stats of the queries in the console
 */

