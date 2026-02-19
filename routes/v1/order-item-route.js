const express = require('express');
const orderItemRouter = express.Router();
const {orderItemController} = require("../../controllers/v1/index");

orderItemRouter.post('/createOrderItem', orderItemController.createOrderItem);

orderItemRouter.get('/getOrderItem/:id', orderItemController.getOrderItem);

orderItemRouter.patch('/updateOrderItem/:id', orderItemController.updateOrderItem);

orderItemRouter.delete('/deleteOrderItem/:id', orderItemController.deleteOrderItem);

module.exports = orderItemRouter;