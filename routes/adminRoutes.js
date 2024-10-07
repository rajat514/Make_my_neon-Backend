const express = require("express");
const router = express.Router();

const { validateCategory, validateProduct, validateCoupon, validateQandA } = require("../validator/validate");

const { handleCreateCategory, handleGetCategory } = require("../controllers/admin/category");

const { handleProduct, handleGetAllProducts, handleUpdateProduct } = require("../controllers/admin/product");

const { handlePostFonts, handleGetAllFonts } = require("../controllers/admin/customiseFonts");

const { handlePostFontColour, handleGetAllFontColours } = require("../controllers/admin/customiseFontColour");

const { handlePostFontSize, handleGetAllFontsizes } = require("../controllers/admin/customiseFontSize");

const { handleGetAllOrder, handleUpdateOrderStatus } = require("../controllers/admin/order");

const { isLogIn, allowedTo } = require("../middleware/auth");

// const { imageValidation } = require("../middleware/image");
const { createNewCoupon, getAllCoupon, updateCoupon, deleteCoupon } = require("../controllers/admin/coupon");

const { handleAllMessage } = require("../controllers/admin/contactUs");

const { handleQandA, updateQandA, deleteQandA, getAllQandA } = require("../controllers/admin/askQuestion")



router.post("/create-category", validateCategory, isLogIn, allowedTo("admin"), handleCreateCategory);

router.get("/get-category", isLogIn, allowedTo("admin"), handleGetCategory);

router.post("/product", validateProduct, isLogIn, allowedTo("admin"), handleProduct);

router.get("/all-products/:id", isLogIn, allowedTo("admin"), handleGetAllProducts);

router.put("/update-product/:id", isLogIn, allowedTo("admin"), handleUpdateProduct)

router.post("/post-font", isLogIn, allowedTo("admin"), handlePostFonts);

router.get("/all-fonts", isLogIn, allowedTo("admin"), handleGetAllFonts);

router.post("/post-font-colour", isLogIn, allowedTo("admin"), handlePostFontColour);

router.get("/all-font-colours", isLogIn, allowedTo("admin"), handleGetAllFontColours);

router.post("/post-font-size", isLogIn, allowedTo("admin"), handlePostFontSize);

router.get("/all-font-sizes", isLogIn, allowedTo("admin"), handleGetAllFontsizes);

router.get("/all-orders", isLogIn, allowedTo("admin"), handleGetAllOrder);

router.post("/update-order-status/:id", isLogIn, allowedTo("admin"), handleUpdateOrderStatus);

router.post("/create-coupon", isLogIn, allowedTo("admin"), validateCoupon, createNewCoupon);

router.get("/all-coupons", isLogIn, allowedTo("admin"), getAllCoupon);

router.put("/update-coupon/:id", isLogIn, allowedTo("admin"), updateCoupon);

router.get("/delete-coupon/:id", isLogIn, allowedTo("admin"), deleteCoupon);

router.get("/all-contacts", isLogIn, allowedTo("admin"), handleAllMessage);

router.post("/question-answer", isLogIn, allowedTo("admin"), validateQandA, handleQandA);

router.put("/update/:id", isLogIn, allowedTo("admin"), updateQandA);

router.post("/delete/:id", isLogIn, allowedTo("admin"), deleteQandA);

router.get("/all-questions", isLogIn, allowedTo("admin"), getAllQandA);




module.exports = router