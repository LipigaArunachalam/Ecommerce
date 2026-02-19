const express = require('express');
const orderRouter = express.Router();
const {orderController} = require('../../controllers/v1/index');

orderRouter.get('/:id', orderController.getOrder);

orderRouter.post('/createOrder', orderController.createOrder);

orderRouter.patch('/updateOrder', orderController.updateOrder);

orderRouter.delete('/deleteOrder',orderController.deleteOrder);

module.exports = orderRouter;