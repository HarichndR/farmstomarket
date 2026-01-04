const Order = require('../schema/orders.schema');
const { v4: uuidv4 } = require('uuid');
const produceOrderRequest = require('../kafka/producer/OrderProducers/produceOrderReq');

async function createOrder(req, res) {
    try {
        const { product_ID, category, owner, payment } = req.body;
        if (!product_ID || !category) return res.apiError('product_ID and category are required', 400);

        const order = new Order({
            orderuuid: uuidv4(),
            product_ID,
            category,
            owner,
            costomer: req.user ? req.user._id : null,
            payment,
            orderStatus: [{ status: 'pending' }],
        });

        const saved = await order.save();

        // publish order-created event for inventory update
        try {
            const payload = {
                orderId: saved._id,
                orderuuid: saved.orderuuid,
                product_ID: saved.product_ID,
                category: saved.category,
                quantity: req.body.quantity || 1,
                variantIndex: req.body.variantIndex,
            };
            produceOrderRequest(payload).catch((e) => console.warn('produceOrderReq error', e && e.message));
        } catch (e) {
            console.warn('failed to produce order event', e && e.message);
        }
        return res.apiSuccess(saved, 'Order created', {}, 201);
    } catch (err) {
        return res.apiError(err.message || 'Could not create order', 500, err);
    }
}

async function listOrders(req, res) {
    try {
        const { role } = req.query;
        let filter = {};
        if (role === 'owner') filter.owner = req.user._id;
        else if (role === 'customer') filter.costomer = req.user._id;

        const orders = await Order.find(filter).populate('owner costomer product_ID').sort({ createdAt: -1 }).lean();
        return res.apiSuccess(orders, 'Orders fetched');
    } catch (err) {
        return res.apiError(err.message || 'Could not fetch orders', 500, err);
    }
}

async function getOrderById(req, res) {
    try {
        const { id } = req.params;
        const order = await Order.findById(id).populate('owner costomer product_ID');
        if (!order) return res.apiError('Order not found', 404);
        return res.apiSuccess(order, 'Order fetched');
    } catch (err) {
        return res.apiError(err.message || 'Could not fetch order', 500, err);
    }
}

async function updateOrderStatus(req, res) {
    try {
        const { id } = req.params;
        const { status } = req.body;
        if (!status) return res.apiError('status is required', 400);

        const order = await Order.findById(id);
        if (!order) return res.apiError('Order not found', 404);

        order.orderStatus = order.orderStatus || [];
        order.orderStatus.push({ status, time: Date.now() });
        await order.save();
        return res.apiSuccess(order, 'Order status updated');
    } catch (err) {
        return res.apiError(err.message || 'Could not update order', 500, err);
    }
}

module.exports = { createOrder, listOrders, getOrderById, updateOrderStatus };
