
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('atelier', '', '', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
});

// create table (model)
const Review = sequelize.define('reviews', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
    },
    date: {
        type: DataTypes.DATE,
    },
    summary: {
        type: DataTypes.TEXT,
    },
    body: {
        type: DataTypes.TEXT,
    },  
    recommend: {
        type: DataTypes.BOOLEAN,
    },  
    reported: {
        type: DataTypes.BOOLEAN,
    },
    reviewer_name: {
        type: DataTypes.TEXT,
    },  
    reviewer_email: {
        type: DataTypes.TEXT,
    }, 
    response: {
        type: DataTypes.TEXT,
    },  
    helpfulness: {
        type: DataTypes.INTEGER,
    },
}, {
    timestamps: false
});

const syncReview = async () => {
    await Review.sync();
}

// create row (record) with fields extracted from data
const createReviewRecord = (data) => {
    const [
        id, 
        product_id, 
        rating, 
        date, 
        summary,
        body,
        recommend,
        reported,
        reviewer_name,
        reviewer_email,
        response,
        helpfulness
    ] = data;

    // const review = await Review.create({ 
    const review = { 
        id: parseInt(id),
        product_id: parseInt(product_id), 
        rating: parseInt(rating) || null, 
        date: new Date(parseInt(date)), 
        summary,
        body,
        recommend: recommend === 'true',
        reported: reported === 'true',
        reviewer_name: reviewer_name,
        reviewer_email,
        response,
        helpfulness: parseInt(helpfulness),
    };

//   console.log(review)
    // await review.save();
    return review;
}

const Photo = sequelize.define('photos', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    reviewId: {
      type: DataTypes.INTEGER,
      field: 'review_id',
      allowNull: false,
    },
    url: {
      type: DataTypes.TEXT,
    },
}, {
    timestamps: false
});

const syncPhoto = async () => {
    await Photo.sync();
}

const createPhotoRecord = async (data) => {
    const [id, review_id, url] = data;

    const photo = await Photo.create({ 
        id: parseInt(id),
        review_id: parseInt(review_id), 
        url,
    });

//   console.log(review)
    await photo.save();
}

Review.hasMany(Photo, {
    foreignKey: 'review_id'
});
Photo.belongsTo(Review);

module.exports = {
    syncReview,
    syncPhoto,
    createReviewRecord,
    createPhotoRecord,
    Review,
    Photo
};