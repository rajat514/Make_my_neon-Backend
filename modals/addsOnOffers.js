const mongoose = require("mongoose");

const addsOnSchema = mongoose.Schema({
    type: {
        type: String,
        require: true,
        enum: ['neon', 'product']
    },
    name: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    }
},
    { timestamps: true }
);


const AddsOnData = mongoose.model('adds-on-offer', addsOnSchema);


module.exports = AddsOnData