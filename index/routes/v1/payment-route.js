const express = require('express');
const paymentRouter = express.Router();
const {paymentController} = require('../../controllers/v1');
const auth = require('../../middleware/auth');

paymentRouter.post('/create-payment', auth(['admin']), paymentController.createPayment);

paymentRouter.get('/', auth(['admin','user']), paymentController.getAllPaymentByPage);

paymentRouter.get('/get-all-payment', auth(['admin']), paymentController.getAllPayment);

paymentRouter.get('/:id', auth(['admin', 'user']), paymentController.getPayment);

paymentRouter.get('/search/:type', auth(['admin', 'user']), paymentController.searchPayment);

paymentRouter.patch('/update-payment/:id', auth(['admin']), paymentController.updatePayment);

paymentRouter.put('/delete-payment/:id', auth(['admin']), paymentController.deletePayment);

module.exports = paymentRouter;