const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    categoryId: {
        type: mongoose.ObjectId,
        ref: 'category'
    },
    name: {
        type: String,
        require: true
    },
    images: [],
    colors: [],

    width: {
        type: Number
    },
    height: {
        type: Number
    },
    quantity: {
        type: Number,
        require: true,
        default: '1'
    },
    price: {
        type: Number,
        require: true
    },
    discount: {
        type: Number
    },
    discountedPrice: {
        type: Number
    },
    productReview: [{
        name: {
            type: String,
            require: true
        },
        email: {
            type: String,
            require: true
        },
        rating: {
            type: String,
            enum: ['1', '2', '3', '4', '5'],
            require: true
        },
        reviewTitle: {
            type: String
        },
        review: {
            type: String,
            require: true
        },
        images_and_videos: [{}]
    }]
},
    { timestamps: true }
);


const Product = mongoose.model('products', productSchema);


module.exports = Product