const Coupon = require("../../modals/coupon");

const { validationResult, matchedData} = require("express-validator");



const createNewCoupon = async (req, res) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty) {
            return res.status(400).json({ errors: error.array() });
        }

        const { code, expires, discount } = matchedData(req);

        const newCoupon = await Coupon.create({
            code,
            expires,
            discount,
            createdAt: expires
        });

        console.log('coupon :', newCoupon);
        return res.status(201).json({successMsg: 'Coupon created', coupon: newCoupon});

    } catch (error) {
        console.log(error);
        return res.status(500).json({ errorMsg: error });
    }
};


const getAllCoupon = async (req, res) => {
    try {
        const allCoupons = await Coupon.find();

        return res.status(200).json({Coupons : allCoupons});

    } catch (error) {
        // console.log(error);
        return res.status(500).json({ errorMsg: error });
    }
}


const updateCoupon = async (req, res) => {
    try {
        const couponId = req.params.id;

        const { code, expires, discount } = req.body;

        const coupon = await Coupon.findById(couponId)
        console.log('coupon :', coupon);
        if(code) coupon.code = code;
        if(expires) coupon.expires = expires;
        if(discount) coupon.discount = discount;
        if(expires) coupon.createdAt = expires;

        coupon.save();
        return res.status(200).json({ successMsg : 'Coupon updated', coupon : coupon });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ errorMsg: error });
    }
}


const deleteCoupon = async (req, res) => {
    try {
        const couponId = req.params.id;

        const deleteCoupon = await Coupon.findByIdAndDelete(couponId);

        return res.status(200).json({ successMsg: "Coupon deleted", coupon :deleteCoupon })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ errorMsg: error });
    }
}


module.exports = {
    createNewCoupon, getAllCoupon, updateCoupon, deleteCoupon
}