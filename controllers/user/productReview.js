const Product = require("../../modals/product");

const { imageValidation } = require("../../middleware/image")


const handleProductReview = async (req, res) => {
    try {
        const { productId, name, email, rating, reviewTitle, review } = req.body;

        const files = req.body.images;

        const product = await Product.findById(productId)

        const value = await imageValidation(files);

        if (value) {
            console.log(value)
            return res.status(400).json({ errorMsg: value });
        }

        if (files.length >= 2) {
            const imagefiles = await files.map(({ name }) => (name));
            await product.productReview.push({ name, email, rating, reviewTitle, review, images_and_videos: imagefiles });
            product.save();
        }
        else {
            await product.productReview.push({ name, email, rating, reviewTitle, review, images_and_videos: files.name });
            product.save();
        }

        // console.log('product :', product)
        return res.status(201).json({ successMsg: 'review Created', review: product.productReview });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ errorMsg: error });
    }
};


// const handleGetProductReview = async (req, res) => {
//     try {

//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({ errorMsg: error });
//     }
// }


module.exports = {
    handleProductReview
}