
/* reads up to 100 reviews */
BEGIN;
EXPLAIN ANALYZE SELECT "Review".*, "photos"."id" AS "photos.id", "photos"."review_id" AS "photos.review_id", "photos"."url" AS "photos.url", "photos"."createdAt" AS "photos.createdAt", "photos"."updatedAt" AS "photos.updatedAt", "photos"."ReviewId" AS "photos.ReviewId" FROM (SELECT "Review"."id", "Review"."product_id", "Review"."rating", "Review"."date", "Review"."summary", "Review"."body", "Review"."recommend", "Review"."reported", "Review"."reviewer_name", "Review"."reviewer_email", "Review"."response", "Review"."helpfulness", "Review"."createdAt", "Review"."updatedAt" FROM "Reviews" AS "Review" WHERE "Review"."product_id" = '64623' LIMIT 100) AS "Review" LEFT OUTER JOIN "photos" AS "photos" ON "Review"."id" = "photos"."review_id";
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

