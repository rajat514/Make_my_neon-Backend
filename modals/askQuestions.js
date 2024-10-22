const mongoose = require("mongoose");


const askQuestionSchema = mongoose.Schema({
    type: {
        type: String,
        require: true,
        enum: ['neon', 'floro', 'shopNeon', 'headLight']
    },
    question: {
        type: String,
        require: true
    },
    answer: {
        type: String,
        require: true
    }
},
    { timestamps: true }
);


const AskQandA = mongoose.model('question-answer-DB', askQuestionSchema);


module.exports = AskQandA