const AskQandA = require("../../modals/askQuestions");
const { validationResult, matchedData } = require("express-validator");

const handleQandA = async (req, res) => {
    try {
        const error = validationResult(req);
        if(!error.isEmpty()){
            return res.status(400).json({errorMsg : error.array()})
        }

        const { question, answer } = matchedData(req);

        const newQandA = await AskQandA.create({
            question,
            answer
        })

        return res.status(201).json({ successMsg: 'Question and Answer created!', data: newQandA })
    } catch (error) {
        return res.status(500).json({errorMsg: error})
    }
};


const updateQandA = async (req, res) => {
    try {
        const { id } = req.params;
        const { question, answer } = req.body;

        const data = await AskQandA.findById(id)

        if(question) data.question = question;
        if(answer) data.answer = answer;

        data.save();

        return res.status(200).json({ successMsg: 'data updated!', data: data })
    } catch (error) {
        return res.status(500).json({ errorMsg: error})
    }
};


const deleteQandA = async (req,res) => {
    try {
        const { id } = req.params;

        await AskQandA.findByIdAndDelete(id);

        return res.status(200).json({successMsg: 'data deleted!'});

    } catch (error) {
        return res.status(500).json({errorMsg: error})
    }
};


const getAllQandA = async (req, res) => {
    try {
        const allQandA = await AskQandA.find();

        return res.status(200).json({ allQandA : allQandA})
    } catch (error) {
        return res.status(500).json({ errorMsg: error})
    }
}

module.exports = {
    handleQandA, updateQandA, deleteQandA, getAllQandA
}