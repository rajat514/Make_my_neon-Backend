const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
    category: {
        type: String,
        require: true,
        unique: true
    },
    image: {
        type: String
    }
},
    { timestamps: true }
);

const Category = mongoose.model('category', categorySchema);


module.exports = Category