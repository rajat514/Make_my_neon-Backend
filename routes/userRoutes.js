const express = require("express");
const router = express.Router();

const { handleSignUp, handleSignIn, handleForgetPassword } = require("../controllers/user/user");

const { isLogIn, isLogOut } = require("../middleware/auth");

const { handleGetProductCategory, handleGetProduct } = require("../controllers/user/category");

const { validateUserSignUp, validateForgetPassword, validateUserSignIn, validateContact } = require("../validator/validate");

const { handleFontCart, handleProductCart, deleteProduct, updateProductQuantity, handleGetCart } = require("../controllers/user/cart");

const { handleProductReview } = require("../controllers/user/productReview");

const { handlePostOrder, handleGetOrder, handleCancelOrder, handleGetAllOrder } = require("../controllers/user/order");

const { handleContact } = require("../controllers/user/contactUs")


router.post("/sign-up", validateUserSignUp, isLogIn, handleSignUp);

router.post("/log-in", validateUserSignIn, handleSignIn);

router.put("/forget-password", validateForgetPassword, handleForgetPassword);

router.get("/log-out", isLogIn, isLogOut);

router.get("/all-category", handleGetProductCategory);

router.get("/category/:id", handleGetProduct);

router.post("/font-add-to-cart", isLogIn, handleFontCart);

router.post("/product-add-to-cart/:id", isLogIn, handleProductCart);

router.put("/update-quantity/:id", isLogIn, updateProductQuantity);

router.delete("/delete-products/:id", isLogIn, deleteProduct);

router.get("/cart", isLogIn, handleGetCart);

router.post("/product-review", isLogIn, handleProductReview);

router.post("/order", isLogIn, handlePostOrder);

router.get("/user-order/:id", isLogIn, handleGetOrder);

router.post("/cancel-order/:id", isLogIn, handleCancelOrder);

router.get("/all-order", isLogIn, handleGetAllOrder);

router.post("/contact-us", validateContact, isLogIn, handleContact)


module.exports = router;
