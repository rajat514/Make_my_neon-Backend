const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
    userId: {
        type: mongoose.ObjectId,
        ref: 'users'
    },
    productId: {
        type: mongoose.ObjectId,
        ref: 'products'
    },
    type: {
        type: String,
        enum: ['neonSign', 'product', 'floroSign']
    },
    image: {
        type: String
    },
    rating: {
        type: String,
        enum: ['0', '1', '2', '3', '4', '5'],
        default: '0',
        require: true
    },
    totalReviewCount: {
        type: String
    },
    reviewTitle: {
        type: String
    },
    review: {
        type: String,
        require: true
    }
},
    { timestamps: true }
);


const Reviews = mongoose.model('reviews-db', reviewSchema);


module.exports = Reviews

