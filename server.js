const express = require('express');
const { Review, Photo } = require('./database');

const port = 8000;

const app = express();

app.get('/reviews', (req, res) => {
    const {page = 1, count = 5, sort = "newest", product_id} = req.query;
    if (!product_id) {
        res.status(400);
        res.json({message: "no product_id"});
    } else {
        console.log(product_id)
        Review
            .findAll({ 
                limit: 100,
                include: [{
                    model: Photo,
                    required: false
                }],
                where: {
                    product_id,
                } 
             }) // select * from review;
            .then((reviews) => {
                console.log(reviews)
                res.send({
                    results: reviews,
                })
            })
    }
});

app.get('/reviews/meta/:product_id', (req, res) => {
    const {product_id} = req.body;
    if (!product_id) {
        res.status(400);
        res.json({message: "no product_id"});
    } 
});

// app.post('/reviews', upload.array("images"), (req, res) => {
//     const {product_id, rating, summary, body, recommend, name, email, characteristics} = req.body;
//     if (!product_id) {
//         res.status(400);
//         res.json({message: "no product_id"});
//     } 
// });

app.put('/reviews/:review_id/helpful', (req, res) => {  
    const {reveiw_id} = req.body;
    if (!product_id) {
        res.status(400);
        res.json({message: "no product_id"});
    }
});

app.put('/reviews/:review_id/report', (req, res) => {
    const {review_id} = req.body;
    if (!product_id) {
        res.status(400);
        res.json({message: "no product_id"});
    }
});

app.listen(port, () => {
    console.log(`server listens on port ${port}`);
});