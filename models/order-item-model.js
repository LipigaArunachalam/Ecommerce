const mongoose = require('mongoose');

const order_item_schema = new mongoose.Schema({
    order_id: String,
    order_item_id: Number,
    product_id: String,
    seller_id: String,
    shipping_limit_date: String,
    price: Number,
    freight_value: Number,
    is_deleted:{
        type: Boolean,
        default: false
    }
},{
    collection: "order-items"
});

module.exports = mongoose.model('order-item', order_item_schema);
