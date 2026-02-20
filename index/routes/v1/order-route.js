const express = require('express');
const orderRouter = express.Router();
const {orderController} = require('../../controllers/v1');
const auth = require('../../middleware/auth');

orderRouter.post('/create-order',auth(['admin']), orderController.createOrder);

orderRouter.get('/',auth(['admin','user']), orderController.getAllOrdersByPage);

orderRouter.get('/:id', auth(['admin', 'user']), orderController.getOrder);

orderRouter.patch('/update-order/:id', auth(['admin']), orderController.updateOrder);

orderRouter.put('/delete-order/:id',auth(['admin']), orderController.deleteOrder);

module.exports = orderRouter;