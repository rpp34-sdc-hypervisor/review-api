const review = new Schema ({
    review_id: Number,
    rating: Number,
    summary: String,
    body: String,
    recommend: Boolean,
    response: String,
    date: Date,
    review_name: String,
    helpfulness: Number,
    photos: [{type: ObjectId, ref: 'photo'}]
});

const photo = new Schema ({
    photo_id: String,
    url: String,
    review_id: {type: ObjectId, ref: 'review'},
});

const characteristic = new Schema ({
    id: Number,
    value: Number,
    review_id: {type: ObjectId, ref: 'review'},
});

const productMeta = new Schema ({
    product_id: Number,
    characteristics: [{type: ObjectId, ref:'characteristic'}]
});
