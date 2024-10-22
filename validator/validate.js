const { body } = require("express-validator");

const validateUserSignUp = [
    body("firstname")
        .notEmpty().withMessage("please fill the correct detail!"),

    body("lastname")
        .notEmpty().withMessage("please fill the correct detail!"),

    body("email")
        .notEmpty().isEmail().withMessage("please fill the correct email!"),

    body("password")
        .notEmpty().isLength({ min: 6, max: 12 }).withMessage("password should be 6 to 12 characters!"),
];

const validateForgetPassword = [
    body("newPassword")
        .notEmpty().isLength({ min: 6, max: 12 }).withMessage("password should be 6 to 12 characters!")
]

const validateUserSignIn = [
    body("email")
        .notEmpty().isEmail().withMessage("please fill the correct email!"),

    body("password")
        .notEmpty().isLength({ min: 6, max: 12 }).withMessage("password should be 6 to 12 characters!"),
];

const validateCategory = [
    body('name')
        .notEmpty().withMessage('please enter the name!'),

    body('type')
        .notEmpty().withMessage('please enter the type!')
];

const validateProduct = [
    body('categoryId')
        .notEmpty().withMessage('please enter the category!'),

    body('images')
        .notEmpty().withMessage('please enter the image!'),

    body('colour')
        .isString().isArray().withMessage('please enter the correct detail!'),

    body('quantity')
        .notEmpty().isNumeric().withMessage('please enter the correct detail!'),

    body('name')
        .notEmpty().withMessage('please enter the name!'),

    body('price')
        .notEmpty().isNumeric().withMessage('please enter the price!'),

    body('discount')
        .isNumeric().withMessage('please enter the correct detail!'),

    body('width')
        .isNumeric().withMessage('please enter the correct detail!'),

    body('height')
        .isNumeric().withMessage('please enter the correct detail!')
];


const validateCoupon = [
    body('code')
        .notEmpty().withMessage('please enter the correct detail!'),

    body('expires')
        .notEmpty().isDate().withMessage('please enter the correct detail!'),

    body('discount')
        .notEmpty().isNumeric().withMessage('please enter the correct detail!')
];


const validateContact = [
    body('name')
        .notEmpty().withMessage('please enter the correct detail!'),

    body('email')
        .notEmpty().isEmail().withMessage('please enter the correct detail!'),

    body('mobile')
        .notEmpty().isNumeric().isLength({ min: 10, max: 10 }).withMessage('please enter the correct detail!'),

    body('city')
        .notEmpty().withMessage('please enter the correct detail!'),

    body('message')
        .notEmpty().isLength({ max: 100 }).withMessage('please enter the correct detail!'),
]


const validateQandA = [
    body('question')
        .notEmpty().isLength({ max: 50 }).withMessage('please enter the correct detail!'),

    body('answer')
        .notEmpty().isLength({ max: 1000 }).withMessage('please enter the correct detail!'),

    body('type')
        .notEmpty().withMessage('please enter the correct detail!'),
]


module.exports = {
    validateUserSignUp,
    validateForgetPassword,
    validateUserSignIn,
    validateCategory,
    validateProduct,
    validateCoupon,
    validateContact,
    validateQandA
};
