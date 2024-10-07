const CustomiseFont = require("../../modals/customiseFonts");


const handlePostFonts = async (req, res) => {
    try {
        const { font, basicFontPrice, letterPrice } = req.body;
        console.log(req.body)
        const newFont = await CustomiseFont.create({
            font,
            letterPrice
        })
        console.log('newfont :', newFont)
        return res.status(201).json({successMsg: 'font created', font: newFont})
    } catch (error) {
        console.log(error);
        return res.status(500).json({ errorMsg: error });
    }
};


const handleGetAllFonts = async (req, res) => {
    try {
        const allFonts = await CustomiseFont.find();

        return res.status(200).json({allFonts : allFonts});
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ errorMsg: error });
    }
}





module.exports = {
    handlePostFonts, handleGetAllFonts
}