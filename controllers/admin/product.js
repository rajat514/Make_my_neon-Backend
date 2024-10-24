const Product = require("../../modals/product");
const Category = require("../../modals/category");
const { validationResult, matchedData } = require("express-validator");

const { imageValidation } = require("../../middleware/image")



const handleProduct = async (req, res) => {

    let files = req.body.images;
    // console.log('files :', files)
    if (!Array.isArray(files)) {
        files = [files]
    }

    const value = await imageValidation(files);
    if (value) {
        if (value === 'err') return res.status(500).json({ errorMsg: 'Error uploading the file.' });
        return res.status(400).json({ errorMsg: value });
    }

    try {

        const error = validationResult(req);
        if (!error.isEmpty) {
            return res.status(400).json({ errorMsg: error.array() });
        }
        const { categoryId, name, price, discount, width, height } = matchedData(req);

        let discountedPrice = Math.round(price - ((price * discount) / 100));


        // if (files.length >= 2) {
        const imagefiles = await files.map(({ name }) => (name));

        const newProduct = await Product.create({
            categoryId,
            images: imagefiles,
            name,
            // colours: colour,
            width,
            height,

            price,
            discount,
            discountedPrice
        })

        return res.status(201).json({ successMsg: 'product saved', newProduct: newProduct });
        // }
        // else {
        //     // console.log(files.name)
        //     const newProduct = await Product.create({
        //         categoryId,
        //         images: files.name,
        //         name,
        //         // colors: color,
        //         width,
        //         height,

        //         price,
        //         discount,
        //         discountedPrice
        //     })

        //     return res.status(201).json({ successMsg: 'product saved', newProduct: newProduct });

        // }

    } catch (error) {
        console.log(error);
        return res.status(500).json({ errorMsg: error });
    }
};

const handleUpdateProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const { name, width, height, price, discount } = req.body;

        let files = req.body.images;
        console.log(files)
        const updateProduct = await Product.findById(productId);

        if (files) {
            if (!Array.isArray(files)) {
                files = [files]
            }
            const value = await imageValidation(files);
            if (value) {
                if (value === 'err') return res.status(500).json({ errorMsg: 'Error uploading the file.' });
                return res.status(400).json({ errorMsg: value });
            }
            const imagefiles = await files.map(({ name }) => (name));
            if (files) updateProduct.images = imagefiles;
        }

        if (name) updateProduct.name = name;
        if (width) updateProduct.width = width;
        if (height) updateProduct.height = height;
        if (price) updateProduct.price = price;
        if (discount) updateProduct.discount = discount;


        updateProduct.discountedPrice = updateProduct.price - ((updateProduct.price * updateProduct.discount) / 100)
        updateProduct.save();
        return res.status(200).json({ successMsg: 'product updated', updated_Product: updateProduct });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ errorMsg: error });
    }
};

const handleGetProducts = async (req, res) => {
    try {
        const { categoryId, page, limit } = req.params;

        let skipNumber = 0;
        const limitNumber = parseInt(limit, 10);
        skipNumber = (page - 1) * limit;


        const allProducts = await Product.find({ categoryId }).skip(skipNumber).limit(limitNumber).exec();
        const totalCount = await Product.countDocuments({ categoryId });

        return res.status(200).json({ allProducts, totalCount });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ errorMsg: error });
    }
};

const handleDeleteProduct = async (req, res) => {
    try {
        const { productId } = req.query;

        await Product.findByIdAndDelete(productId);

        return res.status(200).json({ successMsg: 'product deleted.' });

    } catch (error) {
        return res.status(500).json({ errorMsg: error });
    }
}


const handleGetProductDetails = async (req, res) => {
    try {
        const { slug } = req.params;

        const productData = await Product.findOne({ slug }).populate('productReview.userId')//.limit(15)//.sort({ createdAt: -1 });

        productData.productReview.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        // console.log(productData)
        return res.status(200).json({ data: productData, totalReviews: productData.productReview.length });

    } catch (error) {
        console.log(error)
        return res.status(500).json({ errorMsg: error });
    }
}


const handleGetAllProducts = async (req, res) => {
    try {
        const { page, limit } = req.params

        let skipNumber = 0;
        const limitNumber = parseInt(limit, 10);
        skipNumber = (page - 1) * limit;

        const productsData = await Product.find().populate('categoryId').skip(skipNumber).limit(limitNumber).exec();
        const totalCount = await Product.countDocuments();

        return res.status(200).json({ data: productsData, totalCount });

    } catch (error) {
        return res.status(500).json({ errorMsg: error });
    }
}



module.exports = {
    handleProduct, handleGetProducts, handleUpdateProduct, handleDeleteProduct, handleGetProductDetails, handleGetAllProducts
}