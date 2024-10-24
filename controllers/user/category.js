const Category = require("../../modals/category");
const Product = require("../../modals/product")

const handleGetNeonCategory = async (req, res) => {
    try {
        const allCategory = await Category.find({ type: 'Shop Neon' });

        // console.log('category :', category)
        return res.status(200).json({ data: allCategory })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ errorMsg: error });
    }
}

const handleGetProduct = async (req, res) => {
    try {
        // const { categoryId } = req.body;
        const { categoryId, skip, limit } = req.query;

        const skipNumber = parseInt(skip, 10);
        const limitNumber = parseInt(limit, 10);

        const allProducts = await Product.find({ categoryId }).skip(skipNumber).limit(limitNumber).exec();

        const totalProducts = await Product.countDocuments({ categoryId });

        return res.status(200).json({ data: allProducts, length: totalProducts });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ errorMsg: error });
    }
}

const handleGetHeadLightCategory = async (req, res) => {
    try {
        // const { categoryId } = req.query;

        const allProducts = await Category.findOne({ type: 'Head Light' });
        return res.status(200).json({ data: allProducts })
    } catch (error) {
        return res.status(500).json({ errorMsg: error });
    }
};




module.exports = {
    handleGetNeonCategory, handleGetProduct, handleGetHeadLightCategory
}
