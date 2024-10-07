const CustomiseFontColour = require("../../modals/customiseFontColour");


const handlePostFontColour = async (req, res) => {
    try {
        const { colourCode } = req.body;
        // console.log(colourCode)
        const newFontColour = await CustomiseFontColour.create({
            colour: colourCode
        })
        // console.log('newfont :', newFont)
        return res.status(201).json({successMsg: 'font colour created', Colour: newFontColour})
    } catch (error) {
        console.log(error);
        return res.status(500).json({ errorMsg: error });
    }
}


const handleGetAllFontColours = async (req, res) => {
    try {
        const allFontColours = await CustomiseFontColour.find();

        return res.status(200).json({allFontColours : allFontColours});
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ errorMsg: error });
    }
}




module.exports = {
    handlePostFontColour, handleGetAllFontColours
}