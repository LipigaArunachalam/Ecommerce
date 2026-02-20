const express = require('express');
const orderItemRouter = express.Router();
const {orderItemController} = require("../../controllers/v1");
const auth = require('../../middleware/auth');

orderItemRouter.post('/create-order-item', auth(['admin']), orderItemController.createOrderItem);

orderItemRouter.get('/', auth(['admin','user']), orderItemController.getAllOrderItemsByPage);

orderItemRouter.get('/get-all-order-item', auth(['admin']), orderItemController.getAllOrderItems);

orderItemRouter.get('/:id', auth(['admin', 'user']), orderItemController.getOrderItem);

orderItemRouter.get('/search/:max/:min', auth(['admin', 'user']), orderItemController.searchOrderItem);

orderItemRouter.patch('/update-order-item/:id', auth(['admin']), orderItemController.updateOrderItem);

orderItemRouter.put('/delete-order-item/:id', auth(['admin']), orderItemController.deleteOrderItem);

module.exports = orderItemRouter;