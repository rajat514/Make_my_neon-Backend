const express = require("express");
const router = express.Router();

const { handleSignUp, handleSignIn, handleForgetPassword } = require("../controllers/user/user");

const { isLogIn, isLogOut } = require("../middleware/auth");

const { handleGetNeonCategory, handleGetProduct, handleGetHeadLightCategory } = require("../controllers/user/category");

const { validateUserSignUp, validateForgetPassword, validateUserSignIn, validateContact } = require("../validator/validate");

const { handleNeonFontCart, handleFloroFontCart, handleProductCart, deleteProduct, updateProductQuantity, handleGetCart, handleDeleteCart } = require("../controllers/user/cart");

const { handleProductReview, handleGetNeonReview, handleGetFloroReview } = require("../controllers/user/productReview");

const { handlePostOrder, handleGetOrder, handleCancelOrder, handleGetAllOrder } = require("../controllers/user/order");

const { handleContact } = require("../controllers/user/contactUs");

const { getAllQandA } = require("../controllers/admin/askQuestion");

const { handleGetNeonFontsizes, handleGetFloroFontsizes } = require("../controllers/admin/customiseFontSize");

const { handleGetAllFontColours } = require("../controllers/admin/customiseFontColour");

const { handleGetNeonFonts, handleGetFloroFonts } = require("../controllers/admin/customiseFonts");

const { handleCorouselGallery, handleVideoGallery } = require("../controllers/admin/galleriesController");

const { getAllCoupon } = require("../controllers/admin/coupon");

const { getNeonAddsOn } = require("../controllers/admin/addsOnOfferController")

const { handleGetProductDetails } = require("../controllers/admin/product");








router.get("/all-orders", isLogIn, handleGetAllOrder);

router.post("/sign-up", validateUserSignUp, handleSignUp);

router.post("/log-in", validateUserSignIn, handleSignIn);

router.put("/forget-password", validateForgetPassword, handleForgetPassword);

router.get("/log-out", isLogIn, isLogOut);

router.get("/all-category", handleGetNeonCategory);

router.get("/category", handleGetProduct);

router.post("/neon-font-add-to-cart", isLogIn, handleNeonFontCart);

router.post("/floro-font-add-to-cart", isLogIn, handleFloroFontCart);

router.post("/product-add-to-cart", isLogIn, handleProductCart);

router.put("/update-quantity", isLogIn, updateProductQuantity);

router.delete("/delete-products", isLogIn, deleteProduct);

router.get("/cart", isLogIn, handleGetCart);

router.delete("/delete-cart", isLogIn, handleDeleteCart);

router.post("/add-review", isLogIn, handleProductReview);

router.get("/neon-reviews", handleGetNeonReview);

router.get("/floro-reviews", handleGetFloroReview);

router.post("/order", isLogIn, handlePostOrder);

router.get("/user-order/:id", isLogIn, handleGetOrder);

router.post("/cancel-order/:id", isLogIn, handleCancelOrder);

router.get("/all-order", isLogIn, handleGetAllOrder);

router.post("/contact-us", validateContact, handleContact);

router.get("/all-faqs", getAllQandA);

router.get("/neon-font-sizes", handleGetNeonFontsizes);

router.get("/floro-font-sizes", handleGetFloroFontsizes);

router.get("/all-neon-fonts", handleGetNeonFonts);

router.get("/all-floro-fonts", handleGetFloroFonts);

router.get("/all-font-colours", handleGetAllFontColours);

router.get("/corousel-images", handleCorouselGallery);

router.get("/video-galleries", handleVideoGallery);

router.get("/all-coupons", isLogIn, getAllCoupon);

router.get("/neon-adds-on", getNeonAddsOn);

router.get("/head-light", handleGetHeadLightCategory);

router.get("/product-datails/:slug", handleGetProductDetails);




module.exports = router;
