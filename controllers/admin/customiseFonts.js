const CustomiseFont = require("../../modals/customiseFonts");


const handlePostFonts = async (req, res) => {
    try {
        const { category, name, font, letterPrice } = req.body;

        const customiseFontData = await CustomiseFont.find()

        if (category === 'Neon Sign') {
            // console.log('customiseFontData :', customiseFontData[0])
            if (customiseFontData[0].neonSign.findIndex((item) => item.name === name) !== -1) return res.status(400).json({ errorMsg: 'this font already exists!' });
            if (customiseFontData[0]) {
                customiseFontData[0].neonSign.push({ font, name });
                await customiseFontData[0].save();
                return res.status(200).json({ successMsg: 'font added', data: customiseFontData[0].neonSign[customiseFontData[0].neonSign.length - 1] })
            }
            const newFont = await CustomiseFont.create({
                neonSign: [{
                    name,
                    font
                }]
            })
            return res.status(200).json({ successMsg: 'font added', data: newFont[0].neonSign[newFont[0].neonSign.length - 1] })
        }
        else if (category === 'Floro Sign') {
            // console.log('customiseFontData[0].floroSign :', customiseFontData[0].floroSign.findIndex((item) => item.name === name))
            if (customiseFontData[0].floroSign.findIndex((item) => item.name === name) !== -1) return res.status(400).json({ errorMsg: 'this font already exists!' })
            if (customiseFontData[0]) {
                await customiseFontData[0].floroSign.push({ font, name })
                await customiseFontData[0].save()
                return res.status(200).json({ successMsg: 'font added', data: customiseFontData[0].floroSign[customiseFontData[0].floroSign.length - 1] })
            }
            const newFont = await CustomiseFont.create({
                floroSign: [{
                    name,
                    font,
                }]
            })
            // console.log('newfont :', <newFont></newFont>)
            return res.status(201).json({ successMsg: 'font created', data: newFont[0].floroSign[newFont[0].floroSign.length - 1] })
        }
        else return res.status(400).json({ errorMsg: 'no category filled!' });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ errorMsg: error });
    }
};


const handleGetNeonFonts = async (req, res) => {
    try {
        const allFonts = await CustomiseFont.find();
        const data = allFonts[0];
        return res.status(200).json({ data: data.neonSign });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ errorMsg: error });
    }
};

const handleGetFloroFonts = async (req, res) => {
    try {
        const allFonts = await CustomiseFont.find();
        const data = allFonts[0];
        return res.status(200).json({ data: data.floroSign });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ errorMsg: error });
    }
}





module.exports = {
    handlePostFonts, handleGetNeonFonts, handleGetFloroFonts
}