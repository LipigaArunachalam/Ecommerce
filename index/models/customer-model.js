var mongoose = require("mongoose");

const customer_schema = mongoose.Schema({
    
customer_id : {type: String, unique : true},
customer_unique_id : {type: String, unique : true},
customer_zip_code_prefix : Number,
customer_city : String,
customer_state : String,
is_deleted : {type : Boolean, default : false}
}, {collection : "customers"});

module.exports = mongoose.model("customer", customer_schema);