
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('atelier', '', '', {
  host: 'localhost',
  dialect: 'postgres'
});

// create table (model)
const Review = sequelize.define('Review', {
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
        type: DataTypes.STRING(255),
    },
    body: {
        type: DataTypes.STRING(255),
    },  
    recommend: {
        type: DataTypes.STRING(255),
    },  
    reported: {
        type: DataTypes.INTEGER,
    },
    reviewer_name: {
        type: DataTypes.STRING(100),
    },  
    reviewer_email: {
        type: DataTypes.STRING(100),
    }, 
    response: {
        type: DataTypes.STRING(255),
    },  
    helpfulness: {
        type: DataTypes.INTEGER,
    },
});

const syncReview = async () => {
    await Review.sync();
}

// create row (record) with fields extracted from data
const createReviewRecord = async (data) => {
    const [id, product_id, rating, date, summary,body,recommend,
    reported,
    reviewer_name,
    reviewer_email,
    response,
    helpfulness] = data;

    const review = await Review.create({ 
        id: parseInt(id),
        product_id: parseInt(product_id), 
        rating: parseInt(rating) || null, 
        date: new Date(parseInt(date)), 
        summary,
        body,
        recommend,
        reported: parseInt(reported) || null,
        reviewer_name,
        reviewer_email,
        response,
        helpfulness
    });

//   console.log(review)
    await review.save();
}

const Photo = sequelize.define('photo', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    review_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    url: {
      type: DataTypes.TEXT,
    },
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