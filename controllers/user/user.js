const { validationResult, matchedData } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const TokenDB = require("../../modals/token");

const User = require("../../modals/user");
const constant = require("../../constants");

const saltRounds = 10;

const handleSignUp = async (req, res) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ errors: error.array() });
        }
        const { firstname, lastname, email, password } = matchedData(req);

        const user = await User.findOne({ email });
        console.log('user :', user)
        if (!user) {

            const hash_password = await bcrypt.hash(password, saltRounds);

            const newUser = await User.create({
                firstName: firstname,
                lastName: lastname,
                email,
                password: hash_password,
                role: req.body.role
            });

            await newUser.save();
            console.log("data :", newUser);
            return res.status(201).json({ successMsg: "Sign Up Successful", data: newUser });
        }
        else {
            return res.status(400).json({ errorMsg: 'user already exists!' })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ errorMsg: error });
    }
};


const handleSignIn = async (req, res) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ errors: error.array() });
        }
        const { email, password } = matchedData(req);

        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ errorMsg: "Email not exits!" });

        if (!user.isActive) return res.status(401).json({ errorMsg: 'Account is Banned!' });

        const payload = { email };
        const Token = jwt.sign(payload, constant.secret_key);
        // const Token = jwt.sign({}, secret_key);
        console.log("Token :", Token)
        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            console.log("Passwords match! User authenticated.");

            // Save the token to the database
            const newUserToken = await TokenDB.create({
                email,
                token: Token
            });

            // console.log('newUserToken:', newUserToken);

            // Return success response
            return res.status(200).json({ successMsg: 'Log in successfully.', data: newUserToken, token: Token });
        } else {
            console.log("Passwords do not match! Authentication failed.");
            return res.status(401).json({ errorMsg: "Password does not match!" });
        }
        // console.log("user :", Token);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ errorMsg: error });
    }
};

const handleForgetPassword = async (req, res) => {
    try {
        const { email } = req.query;

        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ errors: error.array() });
        }
        const { newPassword } = matchedData(req);

        const hash_password = await bcrypt.hash(newPassword, saltRounds);

        const user = await User.findOne({ email })
        // console.log("user :", user)
        if (!user) return res.status(404).json({ errorMsg: 'user not exists!' })

        if (user) user.password = hash_password

        user.save();
        console.log("user :", user)
        return res.status(200).json({ successMsg: 'password changed!' });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ errorMsg: error });
    }
}


module.exports = {
    handleSignUp, handleSignIn, handleForgetPassword
};