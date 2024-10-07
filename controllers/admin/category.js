const Category = require("../../modals/category");

const { validationResult, matchedData } = require("express-validator")

const { imageValidation } = require("../../middleware/image");

const handleCreateCategory = async (req, res) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ errors: error.array() });
        }

        const { category } = matchedData(req);

        const files = req.body.images;

        const value = await imageValidation(files);

        if (value) {
            console.log(value)
            return res.status(400).json({ errorMsg: value });
        }

        const newCategory = await Category.create({
            category,
            image: files.name
        })

        await newCategory.save()
        return res.status(201).json({ successMsg: "category created!", category: newCategory })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ errorMsg: error });
    }
};


const handleGetCategory = async (req, res) => {
    const allCategory = await Category.find();
    // console.log('allcategory :', allCategory)
    return res.status(200).json({ allCategory: allCategory })
}


module.exports = {
    handleCreateCategory, handleGetCategory
}