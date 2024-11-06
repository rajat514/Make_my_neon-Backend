const Cart = require("../../modals/cart");
const Order = require("../../modals/order");
const Product = require("../../modals/product");
const Coupon = require("../../modals/coupon");


const handlePostOrder = async (req, res) => {
    try {
        const { code, shippingAddress, paymentMethod } = req.body;
        // console.log('code :', code)



        const coupon = await Coupon.findOne({ code })
        const userId = req.user._id.toString();
        const cart = await Cart.findOne({ userId }).populate("regularProducts.productId");
        // console.log('cart :', cart.regularProducts)
        // console.log('cart :', cart.regularProducts.images)
        // res.json({ cart })
        customiseProducts = cart.customiseProducts;
        const regularProducts = cart.regularProducts;
        // console.log('regularProducts :', regularProducts)
        await Cart.deleteOne({ _id: cart._id });
        if (coupon) {
            cart.totalPrice = cart.totalPrice - (cart.totalPrice * coupon.discount) / 100;
        }

        let orderId
        let counter = await Order.findOne().sort({ _id: -1 });
        // console.log(counter)
        if (!counter) {
            const newOrder = await Order.create({
                orderId,
                userId,
                cartItems: { customiseProducts, regularProducts },
                totalCost: cart.totalPrice,
                shippingAddress,
                paymentMethod
            });
            return res.status(201).json({ successMsg: 'Order Successful', order: newOrder });
        }

        orderId = counter.orderId += 1;

        const newOrder = await Order.create({
            orderId,
            userId,
            cartItems: { customiseProducts, regularProducts },
            totalCost: cart.totalPrice,
            shippingAddress,
            paymentMethod
        });

        // console.log('order :', this.newOrder)
        // newOrder.save();
        return res.status(201).json({ successMsg: 'Order Successful', order: newOrder });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ errorMsg: error });
    }
};


const handleGetOrder = async (req, res) => {
    try {
        // const { orderId } = req.body;
        const orderId = req.params.id;
        console.log('orderId :', orderId)
        const userOrder = await Order.findById(orderId);

        return res.status(200).json({ Order: userOrder });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ errorMsg: error });
    }
};


const handleCancelOrder = async (req, res) => {
    try {
        const { status } = req.body;
        const orderId = req.params.id;
        const userOrder = await Order.findById(orderId);
        const regularProduct = await userOrder.cartItems[0].regularProducts

        userOrder.status = status
        if (userOrder.status === 'cancelled') {
            for (let i = 0; i <= regularProduct.length - 1; i++) {
                const productId = regularProduct[i].product._id.toString();
                const product = await Product.findById(productId);
                product.quantity = +product.quantity + +regularProduct[i].quantity;
                console.log('product :', product)
                product.save()
            }
        };
        userOrder.save();
        return res.status(200).json({ Order: userOrder });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ errorMsg: error });
    }
};

const handleGetAllOrder = async (req, res) => {
    try {
        const userId = req.user._id.toString();
        const userAllOrders = await Order.find({ userId })

        return res.status(200).json({ allOrders: userAllOrders });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ errorMsg: error });
    }
};







module.exports = {
    handlePostOrder, handleGetOrder, handleCancelOrder, handleGetAllOrder
}
