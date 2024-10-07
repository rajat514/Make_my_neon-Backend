const mongoose = require("mongoose");


const customiseFontSchema = mongoose.Schema({
    font: {
        type: String,
        require: true,
        unique: true
    },  
    letterPrice: {
        type: Number,
        require: true
    }
},
{ timestamps: true }
)


const CustomiseFont = mongoose.model('customise-fonts', customiseFontSchema)


module.exports = CustomiseFont