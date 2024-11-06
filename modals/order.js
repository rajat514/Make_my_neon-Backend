const mongoose = require("mongoose");


const orderSchema = mongoose.Schema({
    orderId: {
        type: Number,
        default: 123420,
        unique: true
    },
    userId: {
        type: mongoose.ObjectId,
        ref: 'users',
        require: true
    },
    cartItems: {
        customiseProducts: [{
            // Define fields specific to customizeProducts if needed
        }],
        regularProducts: [{
            productId: {
                type: mongoose.ObjectId,
                ref: 'products', // Ensure this matches the name of your Product model
                required: true
            },
            quantity: Number,
            // Add other fields like price, etc.
        }]
    },
    totalCost: {
        type: Number,
        require: true
    },
    shippingAddress: {
        type: String,
        require: true,
    },
    paymentMethod: {
        type: String,
        enum: ['card', 'cash'],
        default: 'cash'
    },
    isPaid: {
        type: Boolean,
        default: false
    },
    // isDelivered:{
    //     type: Boolean,
    //     default: false
    // },
    // code: {
    //     type: String
    // },
    status: {
        type: String,
        enum: ['pending', 'cancel', 'success', 'delivered'],
        default: 'pending'
    }
});


const Order = mongoose.model('order-db', orderSchema);

module.exports = Order