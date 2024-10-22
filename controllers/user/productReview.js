const Product = require("../../modals/product");
const Reviews = require("../../modals/userReviews");

const { imageValidation } = require("../../middleware/image")


const handleProductReview = async (req, res) => {
    try {
        const { type, productId, rating, reviewTitle, review } = req.body;

        // let files = req.body.image;


        // const value = await imageValidation(files);

        // if (value) {
        //     console.log(value)
        //     return res.status(400).json({ errorMsg: value });
        // }

        if (type === 'product') {
            const product = await Product.findById(productId);
            if (!product) return res.status(404).json({ errorMsg: 'please fill the correct productId!' })
            console.log(product)
            const totalReviewCount = product.productReview.length;
            // console.log(totalReviewCount)
            const newReview = await Reviews.create({
                userId: req.user._id,
                productId,
                type,
                // image: files.name,
                totalReviewCount,
                rating,
                reviewTitle,
                review
            })
            await product.productReview.push(newReview);
            // await product.productReview.push({ userId: req.user, image: files.name, type, rating, reviewTitle, review });
            product.save();

            return res.status(201).json({ successMsg: 'review Created', data: newReview });
        }
        const newReview = await Reviews.create({
            userId: req.user._id,
            type,
            // image: files.name,
            rating,
            reviewTitle,
            review
        })



        return res.status(201).json({ successMsg: 'review Created', data: newReview });



    } catch (error) {
        console.log(error);
        return res.status(500).json({ errorMsg: error });
    }
};


const handleGetNeonReview = async (req, res) => {
    try {

        const data = await Reviews.find({ type: 'neonSign' }).populate('userId').sort({ createdAt: -1 });

        return res.status(200).json({ data: data });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ errorMsg: error });
    }
}


const handleGetFloroReview = async (req, res) => {
    try {

        const data = await Reviews.find({ type: 'floroSign' }).populate('userId').sort({ createdAt: -1 });

        return res.status(200).json({ data: data });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ errorMsg: error });
    }
}


module.exports = {
    handleProductReview, handleGetNeonReview, handleGetFloroReview
}