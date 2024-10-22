const constant = require("../constants");
const jwt = require("jsonwebtoken");
const User = require("../modals/user");
const TokenDB = require("../modals/token");

const isLogIn = async (req, res, next) => {
    const authorization = req.get('Authorization')
    // console.log('auth :', authorization)
    if (authorization) {
        const token = authorization.split(' ')[1];
        if (!token) {
            return res.status(403).json({ message: 'Token not found' });
        }
        // invalid token - synchronous
        try {
            // let decoded = jwt.verify(token, constant.secret_key);
            // const user = await User.findOne({ email: decoded.email });
            // console.log('Logged in User :', user)
            // if (!user) return res.status(401).json({ errorMsg: 'Invalid Token!' });

            // req.user = user;
            let decodedToken = await TokenDB.findOne({ token })
            // console.log("decodedToken :", decodedToken)

            const user = await User.findOne({ email: decodedToken.email });
            // console.log("user :", user)
            if (!user) return res.status(401).json({ errorMsg: 'Invalid Token!' });
            // console.log("user :", user)
            req.user = user
        } catch (err) {
            console.log(err)
            return res.status(401).json({ errorMsg: 'Unauthorized Access!', error: err })
        }

    }
    else {
        return res.status(401).json({ errorMsg: 'Unauthorized Access!' });
    }
    next();
};


const isLogOut = async (req, res) => {
    try {
        await TokenDB.findByIdAndDelete({ email: req.user.email })

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
