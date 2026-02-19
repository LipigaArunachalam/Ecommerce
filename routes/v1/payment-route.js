const express = require('express');
const paymentRouter = express.Router();
const {paymentController} = require('../../controllers/v1/index');

paymentRouter.post('/createPayment', paymentController.createPayment);

paymentRouter.get('/', paymentController.getAllPayment);

paymentRouter.get('/:id', paymentController.getPayment);

paymentRouter.patch('/updatePayment/:id', paymentController.updatePayment);

paymentRouter.delete('/deletePayment/:id', paymentController.deletePayment);

module.exports = paymentRouter;