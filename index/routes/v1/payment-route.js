const express = require('express');
const paymentRouter = express.Router();
const {paymentController} = require('../../controllers/v1/index');

paymentRouter.post('/create-payment', paymentController.createPayment);

paymentRouter.get('/', paymentController.getAllPaymentByPage);

paymentRouter.get('/:id', paymentController.getPayment);

paymentRouter.patch('/update-payment/:id', paymentController.updatePayment);

paymentRouter.put('/delete-payment/:id', paymentController.deletePayment);

module.exports = paymentRouter;