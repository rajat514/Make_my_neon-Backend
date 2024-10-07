const Order = require("../../modals/order");
const Product = require("../../modals/product");



const handleGetAllOrder = async (req, res) => {
    try {
        const allOrder = await Order.find();

        res.status(200).json({ allOrders: allOrder });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ errorMsg: error });
    }
}

const handleUpdateOrderStatus = async (req, res) => {
    try {
        const orderId = req.params.id;
        const status = req.body;

        const userOrder = await Order.findById(orderId);
        userOrder.status = status;

        const regularProduct = await userOrder.cartItems[0].regularProducts

        if (userOrder.status === 'confirmed') {
            for (let i = 0; i <= regularProduct.length - 1; i++) {
                const productId = regularProduct[i].product._id.toString();
                const product = await Product.findById(productId);

                if (product.quantity < 1) {
                    return res.status(404).json({ errorMsg: 'we have not this product', product: product });
                }

                product.quantity = product.quantity - regularProduct[i].quantity;
                console.log('product :', product)
                product.save()
            }
        }
        userOrder.save();

        res.status(200).json({ successMsg: 'Order updated', order: userOrder });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ errorMsg: error });
    }
};



module.exports = {
    handleUpdateOrderStatus, handleGetAllOrder
}