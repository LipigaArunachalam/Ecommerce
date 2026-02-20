const express = require('express');

const router = express.Router();

const v1Routes = require('./v1');

router.use('/order-item', v1Routes.orderItemRouter);
router.use('/order', v1Routes.orderRouter);
router.use('/payment', v1Routes.paymentRouter);

module.exports = router;