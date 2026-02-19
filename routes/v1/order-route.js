const express = require('express');
const orderRouter = express.Router();
const {orderController} = require('../../controllers/v1/index');

orderRouter.post('/create-order', orderController.createOrder);

orderRouter.get('/', orderController.getAllOrdersByPage);

orderRouter.get('/update-all-order', orderController.deleteAllOrder);

orderRouter.get('/:id', orderController.getOrder);

orderRouter.patch('/update-order/:id', orderController.updateOrder);

orderRouter.put('/delete-order/:id',orderController.deleteOrder);

module.exports = orderRouter;