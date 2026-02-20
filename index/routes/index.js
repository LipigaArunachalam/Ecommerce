const express = require('express');

const router = express.Router();

const v1Routes = require('./v1');

router.use('/order-item', v1Routes.orderItemRouter);
router.use('/order', v1Routes.orderRouter);
router.use('/payment', v1Routes.paymentRouter);
router.use('/users', v1Routes.userRoutes);
router.use('/products', v1Routes.productRoutes);
router.use('/sellers', v1Routes.sellerRoutes);
router.use('/customers', v1Routes.customerRoutes);

module.exports = router;
