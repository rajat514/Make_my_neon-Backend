const Contact = require("../../modals/contactUs");
const { validationResult, matchedData} = require("express-validator");

const handleContact = async (req, res) => {
    try {
        const error = validationResult(req);
        if(!error.isEmpty()){
            return res.status(400).json({ errors: error.array() });
        }

        const { name, email, mobile, city, message } = matchedData(req);

        const newMessage = await Contact.create({
            // userId: req.user._id,
            name,
            email,
            mobile,
            city,
            message
        });

        return res.status(201).json({ successMsg: 'Message Sent!', message : newMessage });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ errorMsg: error });
    }
};


// const handleGetMessage = async (req, res) => {
//     try {
//         const myMessages = await Contact.find({ userId: req.user._id })

//         return res.status(200).json({ successMsg : myMessages })
//     } catch (error) {
//         return res.status(500).json({ errorMsg: error });
//     }
// }


module.exports = {
    handleContact
}