const constant = require("../constants");
const jwt = require("jsonwebtoken");
const User = require("../modals/user");

const isLogIn = async (req, res, next) => {
    const token = req.cookies.token;
    // console.log(token)
    if (!token) {
        return res.status(403).json({ errorMsg: "Token not found" });
    }
    try {
        const decoded = jwt.verify(token, constant.secret_key);
        const user = await User.findOne({ email: decoded.email });
        if (!user) return res.status(401).json({ errorMsg: "Invalid Token!" });
        req.user = user;

    } catch (error) {
        console.log(error);
        return res.status(401).json({ errorMsg: "Unauthorized Access!", error: error });
    }
    next();
};


const isLogOut = async (req, res) => {
    try {
        res.clearCookie("token");

        res.status(200).json({ successMsg: "Logout successfully!" });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ errorMsg: "Logout error!", error: error });
    }
}


const allowedTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(401).json({ errorMsg: `You are not authorized to access this route. Your role is ${req.user.role}` });
        }
        next();
    };
};


module.exports = {
    isLogIn, allowedTo, isLogOut
};
