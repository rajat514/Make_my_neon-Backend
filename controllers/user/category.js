const Category = require("../../modals/category");
const Product = require("../../modals/product")

const handleGetProductCategory = async (req, res) => {
    try {
        const allCategory = await Category.find();
        return res.status(200).json({ allCategory: allCategory })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ errorMsg: error });
    }
}

const handleGetProduct = async (req, res) => {
    try {
        // const { categoryId } = req.body;
        const categoryId = req.params.id;

        const products = await Product.find({ categoryId })

        // console.log("products :", products)
        return res.status(200).json({ allProduct: products })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ errorMsg: error });
    }
}


module.exports = {
    handleGetProductCategory, handleGetProduct
}
