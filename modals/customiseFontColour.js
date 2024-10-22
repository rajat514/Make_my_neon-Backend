const mongoose = require("mongoose");


const customiseFontColourSchema = mongoose.Schema({
    // name: {
    //     type: String,
    //     require: true
    // },
    colour: {
        type: String,
        require: true,
        unique: true
    }  
},
{ timestamps: true }
)


const CustomiseFontColour = mongoose.model('customise-fonts-colours', customiseFontColourSchema)


module.exports = CustomiseFontColour