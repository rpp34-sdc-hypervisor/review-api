
const fs = require("fs");
const path = require('path');
const readline = require("readline");

const { 
    createReviewRecord, 
    createPhotoRecord, 
    syncReview, 
    syncPhoto
} = require('../database')

const extractCSV = async (sync, createRecord, filePath) => {
    await sync();

    const input = fs.createReadStream(path.join(__dirname, filePath));
    const rl = readline.createInterface({input});

    rl.on("line", async (row) => {
        try {
            await createRecord(row.split(","))
        } catch (err) {
            console.error(err);
        }
    });
    rl.on("close", () => {
        console.log('file extraction completed');
    });
}

const pathToReview = './old_reviews.csv';
const pathToPhoto= './reviews_photos.csv';
// extractCSV(syncReview, createReviewRecord);
extractCSV(syncPhoto, createPhotoRecord, pathToPhoto);

// const id = 2884134
// const product_id = 71719
// const rating = 4
// const date = '2022-06-06'
// const summary = 'love this product'
// const body = 'It really fits me well, i love it'
// const recommend = 'yes'
// const reported = 0
// const reviewer_name = 'tpminhtam'
// const reviewer_email = 'tam@gmail.com'
// const response = 'i really like this product'
// const helpfulness = 1

// createReviewRecord([
//     id, 
//     product_id, 
//     rating, 
//     date, 
//     summary,
//     body,
//     recommend,
//     reported,
//     reviewer_name,
//     reviewer_email,
//     response,
//     helpfulness
// ])

// const photoId = 0
// const reviewId = 2884134
// const url = ''

// createPhotoRecord([
//     photoId,
//     reviewId,
//     url
// ])