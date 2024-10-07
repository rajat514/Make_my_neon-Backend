const CustomiseFontColour = require("../../modals/customiseFontColour.js");
const CustomiseFontSize = require("../../modals/customiseFontSize.js");
const CustomiseFonts = require("../../modals/customiseFonts.js");
const Cart = require("../../modals/cart.js");
const Product = require("../../modals/product.js")


const handleFontCart = async (req, res) => {
    try {
        const { text, productId } = req.body;

        const fontId = req.query.fontId;
        const colourId = req.query.colourId;
        const sizeId = req.query.sizeId;
        const textLength = text.replace(/\s+/g, '').length;
        const font = await CustomiseFonts.findById(fontId)
        const colour = await CustomiseFontColour.findById(colourId)
        const fontSize = await CustomiseFontSize.findById(sizeId);

        const customisePrice = fontSize.basicPrice + (textLength * font.letterPrice);
        const userId = req.user._id.toString();
        const cart = await Cart.findOne({ userId: userId })

        
        if (!cart) {
            const newCart = await Cart.create({
                userId: req.user._id,
                totalPrice: customisePrice,
                productId
            })
            newCart.customiseProducts.push({ text, fontId, colourId, sizeId, customisePrice })
            
            await newCart.save();
            return res.status(201).json({ successMsg: 'cart added', products: newCart });
        }
        else {
            cart.totalPrice = cart.totalPrice + customisePrice;
            // console.log('cart Producrs :', cart.products)
            cart.customiseProducts.push({ text, fontId, colourId, sizeId, customisePrice });
            // cart.products.push({ text, font, colour, fontSize, customisePrice });
            await cart.save();
            return res.status(201).json({ successMsg: 'cart added', products: cart });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({ errorMsg: error });
    }
};


const handleProductCart = async (req, res) => {
    try {
        const { quantity } = req.body;

        const productId = req.params.id;

        const product = await Product.findById(productId);

        const productPrice = (product.price - (product.price * product.discount / 100)) * quantity;
        // console.log('product Price :', productPrice)
       
        const userId = req.user._id.toString();
        const cart = await Cart.findOne({ userId: userId })
        
        if(!cart){
            const newCart = await Cart.create({
                userId: req.user._id,
                totalPrice: productPrice
            })
            // product.quantity = quantity
            newCart.regularProducts.push({ product, productPrice, quantity });
            newCart.save();
            return res.status(201).json({ successMsg: 'cart added', products: newCart });
        }
        else {
            const sameProduct = await cart.regularProducts.find(({ product }) => product.toString() === productId)
            // console.log('cart :', sameProduct)
            if(sameProduct){
                cart.totalPrice = cart.totalPrice + productPrice;
                sameProduct.quantity += +quantity;
                sameProduct.productPrice += +productPrice;
                cart.save();
                return res.status(201).json({ successMsg: 'cart added', products: cart });
            }


            cart.totalPrice = cart.totalPrice + productPrice;
            // product.quantity = quantity
            cart.regularProducts.push({ product, productPrice, quantity });
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
        const { quantity } = req.body;
        const productId = req.params.id;
        const userId = req.user._id.toString();
        const cart = await Cart.findOne({ userId: userId })
        
        const product = await Product.findById(productId)
        const discountedPrice = product.price - ( product.price * product.discount ) / 100;
        
        if(cart) {
            const item = await cart.regularProducts.find(({ product }) => product.toString() === productId);
            
            item.productPrice = item.productPrice - ( discountedPrice * ( item.quantity - quantity ));
            cart.totalPrice = cart.totalPrice - ( discountedPrice * ( item.quantity - quantity ));
            item.quantity = quantity;

            cart.save();
            return res.status(200).json({ successMsg: 'cart updated', products: cart });
        }
        else {
            return res.status(404).json({ errorMsg: 'product not found!'});
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({ errorMsg: error });
    }
};


const deleteProduct = async (req,res) => {
    try {
        // const { productId } = req.body;
        const productId = req.params.id;
        // console.log('productId :', productId)
        const userId = req.user._id.toString();
        const cart = await Cart.findOne({ userId: userId });
        // console.log('r products :', cart)
        const customProduct = await cart.customiseProducts.find(({ _id }) => _id.toString() === productId)
        const regularProduct = await cart.regularProducts.find(({ _id }) => _id.toString() === productId)
        // console.log('c products :', regularProduct)
        
        if(customProduct){
            cart.totalPrice -= customProduct.customisePrice
            await cart.customiseProducts.remove(customProduct);
        } 
        else{
            cart.totalPrice -= regularProduct.productPrice
            await cart.regularProducts.remove(regularProduct);
        }

        await cart.save();
        return res.status(200).json({ successMsg: 'product deleted', Cart : cart });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ errorMsg: error });
    }
};


const handleGetCart = async (req, res) => {
    try {
        const userId = req.user._id.toString();
        const cart = await Cart.findOne({ userId: userId });
        // console.log('cart :', req.user._id)
        return res.status(200).json({ Cart : cart });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ errorMsg: error });
    }
}


module.exports = {
    handleFontCart, handleProductCart, updateProductQuantity, deleteProduct, handleGetCart
}