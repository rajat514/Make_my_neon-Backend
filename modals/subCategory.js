const mongoose = require("mongoose");

const subCategorySchema = mongoose.Schema({
    name: {
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

const SubCategory = mongoose.model('subCategory', subCategorySchema);


module.exports = SubCategory