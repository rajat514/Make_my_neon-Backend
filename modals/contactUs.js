const mongoose = require("mongoose");

const contactUsSchema = mongoose.Schema({
    // userId: {
    //     type: mongoose.ObjectId,
    //     ref: 'users'
    // },
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    mobile: {
        type: Number,
        require: true
    },
    city: {
        type: String,
        require: true
    },
    message: {
        type: String,
        require: true
    },
    isReplied: {
        type: Boolean,
        default: false
    }
},
    { timestamps: true }
);


const Contact = mongoose.model('contactus-DB', contactUsSchema);


module.exports = Contact