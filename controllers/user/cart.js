const CustomiseFontColour = require("../../modals/customiseFontColour.js");
const CustomiseFontSize = require("../../modals/customiseFontSize.js");
const CustomiseFonts = require("../../modals/customiseFonts.js");
const Cart = require("../../modals/cart.js");
const Product = require("../../modals/product.js");
const AddsOnData = require("../../modals/addsOnOffers.js");
const { imageValidation } = require("../../middleware/image.js");


const handleNeonFontCart = async (req, res) => {
    try {
        const { text, type, fontId, colourId, sizeId, waterProof, wirelessController, price } = req.body;

        // const textLength = text.replace(/\s+/g, '').length;

        // const addsOnData = await AddsOnData.findById(addsOnOfferId);

        const fontData = await CustomiseFonts.find()
        const fontObj = fontData[0]
        const font = fontObj.neonSign.find((item) => item._id.toString() === fontId.toString());
        if (!font) return res.status(404).json({ errorMsg: 'please enter the correct font!' });

        const colour = await CustomiseFontColour.findById(colourId);
        if (!colour) return res.status(404).json({ errorMsg: 'please enter the correct colour!' });

        const fontSizeData = await CustomiseFontSize.find()
        const fontSizeObj = fontSizeData[0]
        const fontSize = fontSizeObj.neonSign.find((item) => item._id.toString() === sizeId.toString());
        if (!fontSize) return res.status(404).json({ errorMsg: 'please enter the correct size!' });

        const files = req.body.image;
        const value = await imageValidation(files);

        if (value) {
            console.log(value)
            return res.status(400).json({ errorMsg: value });
        }

        const customisePrice = +price;//fontSize.basicPrice + (textLength * font.letterPrice);
        const userId = req.user._id.toString();
        const cart = await Cart.findOne({ userId: userId })

        let obj = {};
        if (waterProof) obj.waterProof = waterProof
        if (wirelessController) obj.wirelessController = wirelessController

        if (!cart) {
            const newCart = await Cart.create({
                userId: req.user._id,
                totalPrice: customisePrice
            })
            newCart.customiseProducts.push({ type, image: files.name, text, font, colour, fontSize, addsOn: obj, customisePrice })

            await newCart.save();
            return res.status(201).json({ successMsg: 'cart added', products: newCart.customiseProducts[newCart.customiseProducts.length - 1] });
        }
        else {
            cart.totalPrice = +cart.totalPrice + +customisePrice;

            cart.customiseProducts.push({ type, image: files.name, text, font, colour, fontSize, addsOn: obj, customisePrice });

            await cart.save();

            return res.status(201).json({ successMsg: 'cart added', products: cart.customiseProducts[cart.customiseProducts.length - 1] });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({ errorMsg: error });
    }
};

const handleFloroFontCart = async (req, res) => {
    try {
        const { type, text, fontId, sizeId, price } = req.body;

        const files = req.body.image;
        const value = await imageValidation(files);

        if (value) {
            console.log(value)
            return res.status(400).json({ errorMsg: value });
        }

        const fontData = await CustomiseFonts.find()
        const fontObj = fontData[0]
        const font = fontObj.floroSign.find((item) => item._id.toString() === fontId.toString());
        if (!font) return res.status(404).json({ errorMsg: 'please enter the correct font!' });

        // const colour = await CustomiseFontColour.findById(colourId);

        const fontSizeData = await CustomiseFontSize.find()
        const fontSizeObj = fontSizeData[0]
        const fontSize = fontSizeObj.floroSign.find((item) => item._id.toString() === sizeId.toString());
        if (!fontSize) return res.status(404).json({ errorMsg: 'please enter the correct fontSize!' });

        const customisePrice = +price;//fontSize.basicPrice + (textLength * font.letterPrice);
        const userId = req.user._id.toString();
        const cart = await Cart.findOne({ userId: userId })
        // const neonCart = await cart.customiseProducts

        if (!cart) {
            const newCart = await Cart.create({
                userId: req.user._id,
                totalPrice: customisePrice
            })
            newCart.customiseProducts.push({ type, text, image: files.name, font, fontSize, customisePrice })

            await newCart.save();
            return res.status(201).json({ successMsg: 'cart added', data: newCart.customiseProducts[newCart.customiseProducts.length - 1] });
        }
        else {
            cart.totalPrice = +cart.totalPrice + +customisePrice;
            // console.log('cart Producrs :', cart.products)
            cart.customiseProducts.push({ type, text, image: files.name, font, fontSize, customisePrice });
            // cart.products.push({ text, font, colour, fontSize, customisePrice });
            await cart.save();
            return res.status(201).json({ successMsg: 'cart added', data: cart.customiseProducts[cart.customiseProducts.length - 1] });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({ errorMsg: error });
    }
};


const handleProductCart = async (req, res) => {
    try {
        const { quantity, colour, waterProof, wirelessController, productId, price } = req.body;

        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ errorMsg: 'this product not fount!' })

        const productPrice = +price * quantity//(product.price - (product.price * product.discount / 100)) * quantity;
        // console.log('product Price :', productPrice)

        let obj = {};
        if (waterProof) obj.waterProof = waterProof
        if (wirelessController) obj.wirelessController = wirelessController
        // array.push({ waterProof, wirelessController })

        const userId = req.user._id.toString();
        const cart = await Cart.findOne({ userId: userId })

        if (!cart) {
            const newCart = await Cart.create({
                userId: req.user._id,
                totalPrice: productPrice
            })
            // product.quantity = quantity
            newCart.regularProducts.push({ productId, colour, addsOn: obj, productPrice, quantity });
            newCart.save();
            return res.status(201).json({ successMsg: 'cart added', products: newCart });
        }
        else {

            const sameProduct = await cart.regularProducts.find((item) => item.productId.toString() === productId.toString())
            // console.log('cart :', sameProduct.addsOn)
            if (sameProduct) {
                sameProduct.addsOn = obj;
                cart.totalPrice = cart.totalPrice + productPrice;
                sameProduct.quantity += +quantity;
                sameProduct.productPrice += +productPrice;
                cart.save();
                return res.status(201).json({ successMsg: 'cart added', products: cart });
            }


            cart.totalPrice = cart.totalPrice + productPrice;
            // product.quantity = quantity
            cart.regularProducts.push({ productId, colour, addsOn: obj, productPrice, quantity });
            cart.save();
            return res.status(201).json({ successMsg: 'cart added', products: cart });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({ errorMsg: error });
    }
};




const updateProductQuantity = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.user._id//.toString();
        // console.log(productId)
        const cart = await Cart.findOne({ userId })

        const product = await Product.findById(productId)
        // console.log('product :', product)
        const discountedPrice = Math.round(product.price - (product.price * product.discount) / 100);
        // console.log('discountedPrice :', discountedPrice)
        if (cart) {
            const item = await cart.regularProducts.find((product) => product.productId.toString() === productId.toString());
            // console.log(item)
            item.productPrice = item.productPrice - (discountedPrice * (item.quantity - quantity));
            cart.totalPrice = cart.totalPrice - (discountedPrice * (item.quantity - quantity));
            item.quantity = quantity;

            cart.save();
            return res.status(200).json({ successMsg: 'cart updated', products: cart });
        }
        else {
            return res.status(404).json({ errorMsg: 'product not found!' });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({ errorMsg: error });
    }
};


const deleteProduct = async (req, res) => {
    try {

        const { productId } = req.query;

        const userId = req.user._id.toString();
        const cart = await Cart.findOne({ userId: userId });

        const customProduct = await cart.customiseProducts.id(productId)
        const regularProduct = await cart.regularProducts.id(productId)
        // console.log('c products :', regularProduct)

        if (customProduct) {
            cart.totalPrice -= customProduct.customisePrice
            await customProduct.deleteOne();
        }
        if (regularProduct) {
            cart.totalPrice -= regularProduct.productPrice
            await regularProduct.deleteOne();
        }

        await cart.save();
        return res.status(200).json({ successMsg: 'product deleted', Cart: cart });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ errorMsg: error });
    }
};


const handleGetCart = async (req, res) => {
    try {
        const userId = req.user._id.toString();
        const cart = await Cart.findOne({ userId: userId }).populate("regularProducts.productId")
        // console.log(cart.customiseProducts.length)
        // console.log(cart.regularProducts.length)
        let cartLength
        if (cart) {
            cartLength = +cart.customiseProducts?.length + +cart.regularProducts?.length

        }
        return res.status(200).json({ Cart: cart, cartLength: cartLength });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ errorMsg: error });
    }
}


const handleDeleteCart = async (req, res) => {
    // try {
    //     const userId = req.user._id.toString();
    //     const cart = await Cart.find({ userId })
    //     cart.deleteMany({}, function (err) {
    //         if (err) {
    //             console.error("Error deleting documents:", err);
    //         } else {
    //             console.log("All documents deleted.");
    //         }
    //     });
    //     return res.status(200).json({ successMsg: 'cart deleted.' });
    // } catch (error) 
    //     console.log(error)
    //     return res.status(500).json({ errorMsg: error });
    // }
}


module.exports = {
    handleNeonFontCart, handleFloroFontCart, handleProductCart, updateProductQuantity, deleteProduct, handleGetCart, handleDeleteCart
}