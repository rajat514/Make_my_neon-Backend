const mongoose = require("mongoose");


const customiseFontSizeSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
        unique: true
    },
    width: {
        type: Number,
        require: true
    },
    height: {
        type: Number,
        require: true
    },
    basicPrice: {
        type: Number,
        require: true
    }
},
{ timestamps: true }
)


const CustomiseFontSize = mongoose.model('customise-font-sizes', customiseFontSizeSchema)


module.exports = CustomiseFontSize