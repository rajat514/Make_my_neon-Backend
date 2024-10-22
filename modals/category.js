const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
    type: {
        type: String,
        require: true,
        enum: ['Shop Neon', 'Head Light']
    },
    image: {
        type: String
    },
    name: {
        type: String,
        require: true
    }
},
    { timestamps: true }
);

const Category = mongoose.model('category', categorySchema);


module.exports = Category