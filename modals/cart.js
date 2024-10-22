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
    customiseProducts: [{
        type: {
            type: String,
            enum: ['neon', 'floro'],
            require: true
        },
        image: {
            type: String,
            require: true
        },
        text: {
            type: String,
        },
        font: {
            // type: mongoose.Schema.Types.ObjectId,
            // ref: 'customise-fonts'
        },
        colour: {
            // type: mongoose.Schema.Types.ObjectId,
            // ref: 'customise-font-sizes'
        },
        fontSize: {
            // type: mongoose.Schema.Types.ObjectId,
            // ref: 'customise-fonts-colours'
        },
        customisePrice: {
            type: Number,
        },
        quantity: {
            type: Number,
            default: '1'
        },
        addsOn: {},
        price: {
            type: Number,
            require: true
        }

    }],
    regularProducts: [{
        productId: {
            type: mongoose.ObjectId,
            ref: 'products'
        },
        quantity: {
            type: Number,
            default: '1'
        },
        colour: {
            type: String
        },
        addsOn: {},
        productPrice: {
            type: Number
        }
    }]
},
    { timestamps: true }
);


const Cart = mongoose.model('cart', cartSchema);


module.exports = Cart