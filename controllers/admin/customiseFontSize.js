const CustomiseFontSize = require("../../modals/customiseFontSize");
// const CustomiseFont = require("../../modals/customiseFonts")

const handlePostFontSize = async (req, res) => {
    try {
        const { name, width, height, basicSizePrice } = req.body;
        // console.log(colourCode)
        const newFontSize = await CustomiseFontSize.create({
            name,
            width,
            height,
            basicPrice: basicSizePrice
        })
        // console.log('newfont :', newFont)
        return res.status(201).json({ successMsg: 'font size created', size: newFontSize })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ errorMsg: error });
    }
};


const handleGetAllFontsizes = async (req, res) => {
    try {
        const allFontSizes = await CustomiseFontSize.find();

        return res.status(200).json({allFontSizes : allFontSizes});
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ errorMsg: error });
    }
}





module.exports = {
    handlePostFontSize, handleGetAllFontsizes
}