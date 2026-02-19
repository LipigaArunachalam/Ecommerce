const express = require('express');
const orderItemRouter = express.Router();
const {orderItemController} = require("../../controllers/v1/index");

orderItemRouter.post('/create-order-item', orderItemController.createOrderItem);

orderItemRouter.get('/', orderItemController.getAllOrderItemsByPage);

orderItemRouter.get('/update-all-order-item', orderItemController.deleteAllOrderItem);

orderItemRouter.get('/:id', orderItemController.getOrderItem);

orderItemRouter.patch('/update-order-item/:id', orderItemController.updateOrderItem);

orderItemRouter.put('/delete-order-item/:id', orderItemController.deleteOrderItem);

module.exports = orderItemRouter;