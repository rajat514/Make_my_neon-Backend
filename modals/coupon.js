const mongoose = require("mongoose");


const couponSchema = mongoose.Schema({
      code: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        uppercase: true
      },
      expires: {
        type: Date,
        required: true,
      },
      discount: {
        type: Number,
        required: true,
        min: 0,
      },
},
    { timestamps: true }
);


const Coupon = mongoose.model('coupen-DB', couponSchema);


module.exports = Coupon