const mongoose = require("mongoose");

const tokenSchema = mongoose.Schema({
    email: {
        type: String,
        require: true
    },
    role: {
        type: String,
    },
    token: {
        type: String,
        require: true
    }
},
    { timestamps: true }
);


const TokenDB = mongoose.model("token-db", tokenSchema);


module.exports = TokenDB