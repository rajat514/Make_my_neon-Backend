const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
    userId: {
        type: mongoose.ObjectId,
        ref: 'users'
    },
    totalPrice: {
        type: Number,
        require: true
    },
    customiseProducts:[{
        text: {
            type: String,
        },
        fontId: {
            type: mongoose.ObjectId,
            ref: 'customise-fonts'
        },
        colourId: {
            type: mongoose.ObjectId,
            ref: 'customise-font-sizes'
        },
        sizeId: {
            type: mongoose.ObjectId,
            ref: 'customise-fonts-colours'
        },
        customisePrice: {
            type: Number,
        },
        quantity:{
            type: Number,
            default: '1'
        }
        
    }],
    regularProducts: [{
        product: {
            type: mongoose.ObjectId,
            ref: 'products'
        },
        quantity: {
            type: Number,
            default: '1'
        },
        productPrice: {
            type: Number
        }
    }]
},
    { timestamps: true }
);


const Cart = mongoose.model('cart', cartSchema);


module.exports = Cart