const { validationResult, matchedData } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
        return res.status(201).json({ successMsg: "Sign Up Successful", user: newUser });
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
        console.log("payload :",payload)
        bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
                console.error("Error comparing passwords:", err);
                return;
            }

            if (result) {
                res.cookie("token", Token, { httpOnly: true });
                console.log("Passwords match! User authenticated.");
                return res.status(200).json({ SuccessMsg: "Log In successful", User: user, Token: Token });
            } else {
                console.log("Passwords do not match! Authentication failed.");
                return res.status(200).json({ errorMsg: "Password does not match!" });
            }
        });
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