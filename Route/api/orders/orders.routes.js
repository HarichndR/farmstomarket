const express = require('express');
const router = express.Router();
const checkUserAutho = require('../../../middlewares/checkUserAutho');
const controller = require('../../../controller/orders.controller');

// Protected routes for orders
router.post('/', checkUserAutho, controller.createOrder);
router.get('/', checkUserAutho, controller.listOrders);
router.get('/:id', checkUserAutho, controller.getOrderById);
router.patch('/:id/status', checkUserAutho, controller.updateOrderStatus);

module.exports = router;
