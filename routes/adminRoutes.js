const express = require("express");
const router = express.Router();

const { validateCategory, validateProduct, validateCoupon, validateQandA } = require("../validator/validate");

const { handleCreateCategory, handleGetCategory } = require("../controllers/admin/category");

const { handleProduct, handleGetAllProducts, handleGetProducts, handleUpdateProduct, handleDeleteProduct } = require("../controllers/admin/product");

const { handlePostFonts } = require("../controllers/admin/customiseFonts");

const { handlePostFontColour } = require("../controllers/admin/customiseFontColour");

const { handlePostFontSize } = require("../controllers/admin/customiseFontSize");

const { handleGetAllOrder, handleUpdateOrderStatus } = require("../controllers/admin/order");

const { isLogIn, allowedTo } = require("../middleware/auth");

// const { imageValidation } = require("../middleware/image");
const { createNewCoupon, updateCoupon, deleteCoupon } = require("../controllers/admin/coupon");

const { handleAllMessage } = require("../controllers/admin/contactUs");

const { handleQandA, updateQandA, deleteQandA } = require("../controllers/admin/askQuestion");

const { handlePostGallery, handleDeleteGallery } = require("../controllers/admin/galleriesController");

const { createAddsOn } = require("../controllers/admin/addsOnOfferController");



router.post("/create-category", validateCategory, isLogIn, allowedTo("admin"), handleCreateCategory);

router.get("/get-category", isLogIn, allowedTo("admin"), handleGetCategory);

router.post("/product", validateProduct, isLogIn, allowedTo("admin"), handleProduct);

router.get("/all-products/:categoryId/:page/:limit", isLogIn, allowedTo("admin"), handleGetProducts);

router.get("/products/:page/:limit", isLogIn, allowedTo("admin"), handleGetAllProducts);

router.delete("/delete-product", isLogIn, allowedTo("admin"), handleDeleteProduct)

router.put("/update-product/:productId", isLogIn, allowedTo("admin"), handleUpdateProduct)

router.post("/post-font", isLogIn, allowedTo("admin"), handlePostFonts);

router.post("/post-font-colour", isLogIn, allowedTo("admin"), handlePostFontColour);

router.post("/post-font-size", isLogIn, allowedTo("admin"), handlePostFontSize);

router.get("/all-orders", isLogIn, allowedTo("admin"), handleGetAllOrder);

router.post("/update-order-status/:id", isLogIn, allowedTo("admin"), handleUpdateOrderStatus);

router.post("/create-coupon", isLogIn, allowedTo("admin"), validateCoupon, createNewCoupon);

router.put("/update-coupon/:id", isLogIn, allowedTo("admin"), updateCoupon);

router.get("/delete-coupon/:id", isLogIn, allowedTo("admin"), deleteCoupon);

router.get("/all-contacts", isLogIn, allowedTo("admin"), handleAllMessage);

router.post("/question-answer", isLogIn, allowedTo("admin"), validateQandA, handleQandA);

router.put("/update", isLogIn, allowedTo("admin"), updateQandA);

router.post("/delete", isLogIn, allowedTo("admin"), deleteQandA);

router.post("/upload-gallery", isLogIn, allowedTo("admin"), handlePostGallery);

router.delete("/delete-gallery", isLogIn, allowedTo("admin"), handleDeleteGallery);

router.post("/create-adds-on", isLogIn, allowedTo("admin"), createAddsOn);






module.exports = router