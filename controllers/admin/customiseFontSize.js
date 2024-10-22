const CustomiseFontSize = require("../../modals/customiseFontSize");
// const CustomiseFont = require("../../modals/customiseFonts")

const handlePostFontSize = async (req, res) => {
    try {
        const { category, name, width, height, basicSizePrice, charPrice, fontSize } = req.body;
        // console.log(colourCode)
        // const newFontSize = await CustomiseFontSize.create({
        // name,
        // width,
        // height,
        // basicPrice: basicSizePrice
        // })
        // // console.log('newfont :', newFont)
        // return res.status(201).json({ successMsg: 'font size created', size: newFontSize })
        const customiseFontSizeData = await CustomiseFontSize.find()
        // console.log(req.body)
        if (category === 'Neon Sign') {
            if (customiseFontSizeData[0]) {
                customiseFontSizeData[0].neonSign.push({ name, width, height, basicPrice: basicSizePrice, fontSize, charPrice });
                await customiseFontSizeData[0].save();
                return res.status(200).json({ successMsg: 'font added', data: customiseFontSizeData })
            }
            const newFontSize = await CustomiseFontSize.create({
                neonSign: [{
                    name,
                    width,
                    height,
                    fontSize,
                    charPrice,
                    basicPrice: basicSizePrice
                }]
            })
            // console.log('newfont :', newFont)
            return res.status(200).json({ successMsg: 'font size added.', data: newFontSize })
        }
        else if (category === 'Floro Sign') {
            if (customiseFontSizeData[0]) {
                await customiseFontSizeData[0].floroSign.push({ name, width, height, basicPrice: basicSizePrice, fontSize, charPrice })
                await customiseFontSizeData[0].save()
                return res.status(200).json({ successMsg: 'font size added.', data: customiseFontSizeData })
            }
            const newFontSize = await CustomiseFontSize.create({
                floroSign: [{
                    name,
                    width,
                    height,
                    fontSize,
                    charPrice,
                    basicPrice: basicSizePrice
                }]
            })
            console.log('newfont :', newFont)
            return res.status(201).json({ successMsg: 'font created', data: newFontSize })
        }
        else return res.status(400).json({ errorMsg: 'no category filled!' });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ errorMsg: error });
    }
};


const handleGetNeonFontsizes = async (req, res) => {
    try {
        const allFontSizes = await CustomiseFontSize.find();
        // console.log('allFontSizes :', allFontSizes)
        const data = allFontSizes[0];
        return res.status(200).json({ data: data.neonSign });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ errorMsg: error });
    }
}

const handleGetFloroFontsizes = async (req, res) => {
    try {
        const allFontSizes = await CustomiseFontSize.find();
        // console.log('allFontSizes :', allFontSizes)
        const data = allFontSizes[0];
        return res.status(200).json({ data: data.floroSign });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ errorMsg: error });
    }
}





module.exports = {
    handlePostFontSize, handleGetNeonFontsizes, handleGetFloroFontsizes
}