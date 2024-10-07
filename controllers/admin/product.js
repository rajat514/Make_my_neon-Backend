const Product = require("../../modals/product");
const Category = require("../../modals/category");
const { validationResult, matchedData } = require("express-validator");

const { imageValidation } = require("../../middleware/image")



const handleProduct = async (req, res) => {

    const files = req.body.images;

    const value = await imageValidation(files);
    // console.log('value :', value)
    if (value) {
        if (value === err) return res.status(500).json({ errorMsg: 'Error uploading the file.' });
        return res.status(400).json({ errorMsg: value });
    }

    try {
        const error = validationResult(req);
        if (!error.isEmpty) {
            return res.status(400).json({ errorMsg: error.array() });
        }
        const { categoryId, name, colors, quantity, price, discount, width, height } = matchedData(req);

        const color = await colors.split(',');

        const category = await Category.findById(categoryId);

        if (files.length >= 2) {
            const imagefiles = await files.map(({ name }) => (name));

            const newProduct = await Product.create({
                categoryId: category._id,
                images: imagefiles,
                name,
                colors: color,
                width,
                height,
                quantity,
                price,
                discount
            })

            return res.status(201).json({ successMsg: 'product saved', newProduct: newProduct });
        }
        else {
            // console.log(files.name)
            const newProduct = await Product.create({
                categoryId: category._id,
                images: files.name,
                name,
                colors: color,
                width,
                height,
                quantity,
                price,
                discount
            })

            return res.status(201).json({ successMsg: 'product saved', newProduct: newProduct });

        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({ errorMsg: error });
    }
};

const handleUpdateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const { name, width, height, quantity, price, discount } = req.body;
        
        const updateProduct = await Product.findById(productId);
        
        if (name) updateProduct.name = name;
        if (width) updateProduct.width = width;
        if (height) updateProduct.height = height;
        if (quantity) updateProduct.quantity = quantity;
        if (price) updateProduct.price = price;
        if (discount) updateProduct.discount = discount;
        
        updateProduct.save();
        return res.status(200).json({successMsg: 'product updated', updated_Product: updateProduct});

    } catch (error) {
        console.log(error);
        return res.status(500).json({ errorMsg: error });
    }
};

const handleGetAllProducts = async (req, res) => {
    try {
        const categoryId = req.params.id;

        const allProducts = await Product.find({ categoryId });

        return res.status(200).json({allProducts : allProducts});

    } catch (error) {
        console.log(error);
        return res.status(500).json({ errorMsg: error });
    }
};


module.exports = {
    handleProduct, handleGetAllProducts, handleUpdateProduct
}