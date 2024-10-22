const Contact = require("../../modals/contactUs");


const handleAllMessage = async (req, res) => {
    try {
        const allMessages = await Contact.find()

        return res.status(200).json({ data: allMessages })

    } catch (error) {
        return res.status(500).json({ errorMsg: error });
    }
};


module.exports = {
    handleAllMessage
}