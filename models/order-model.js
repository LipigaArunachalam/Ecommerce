const mongoose = require('mongoose');

const orders_schema = new mongoose.Schema({
    order_id: String,
    customer_id: String,
    order_status: String,
    order_purchase_timestamp: String,
    order_approved_at: String,
    order_delivered_carrier_date: String,
    order_delivered_customer_date: String,
    order_estimated_delivery_date: String
},{
    collection:'orders'
});

module.exports = mongoose.model('order',orders_schema);