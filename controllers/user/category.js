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
        const { categoryId } = req.query;

        // const categoryData = await Category.find()
        // const category
        // let limit = 5;
        // let skip = (limit )
        const allProducts = await Product.find({ categoryId }).limit(5).skip(5).exec();
        // console.log("Fetched Products: ", allProducts.length);

        return res.status(200).json({ data: allProducts, length: allProducts.length })
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
