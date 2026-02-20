const mongoose = require('mongoose');

const payment_schema= new mongoose.Schema({
    order_id: String,
    payment_sequential: Number,
    payment_type: String,
    payment_installments: Number,
    payment_value: Number,
    is_deleted: {
        type: Boolean,
        default: false
    }
},{
    collection:"payments"
});

module.exports = mongoose.model('payment', payment_schema);