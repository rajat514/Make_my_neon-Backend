const mongoose = require("mongoose");

const galleriesSchema = mongoose.Schema({
    type: {
        type: String,
        enum: ['corousel', 'videoGallery'],
        require: true
    },
    url: {
        type: String,
        require: true
    },
    text: {
        type: String,
        require: true
    }
},
    { timestamps: true }
);


const Galleries = mongoose.model('galleries-db', galleriesSchema);


module.exports = Galleries