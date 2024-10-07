const mongoose = require("mongoose");


const orderSchema = mongoose.Schema({
    userId: {
        type: mongoose.ObjectId,
        ref: 'users',
        require: true
    },
    cartItems: [],
    totalCost:{
        type: Number,
        require: true
    },
    shippingAddress: {
        type: String,
        require: true,
    },
    paymentMethod:{
        type: String,
        enum: ['card','cash'],
        default: 'cash'
    },
    isPaid:{
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
        enum: ['pending', 'rejected', 'confirmed', 'delivered', 'cancelled'],
        default: 'pending'
    }
});


const Order = mongoose.model('order-db', orderSchema);

module.exports = Order