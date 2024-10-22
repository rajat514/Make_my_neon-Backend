const AddsOnData = require("../../modals/addsOnOffers");


const createAddsOn = async (req, res) => {
    try {
        const { type, name, price } = req.body;

        const newData = await AddsOnData.create({
            type,
            name,
            price
        });

        return res.status(201).json({ successMsg: 'addsOn data added.', data: newData });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ errorMsg: error });
    }
};

const updateAddsOn = async (req, res) => {
    try {
        const { } = req.body;

    } catch (error) {
        return res.status(500).json({ errorMsg: error });
    }
}


const getNeonAddsOn = async (req, res) => {
    try {
        const data = await AddsOnData.find({ type: 'neon' });

        return res.status(201).json({ data: data });

    } catch (error) {
        return res.status(500).json({ errorMsg: error });
    }
};


module.exports = {
    createAddsOn, getNeonAddsOn
}