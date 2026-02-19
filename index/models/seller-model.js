var mongoose = require("mongoose");

const seller_schema = mongoose.Schema({
    
seller_id : {type : String, unique : true},
seller_zip_code_prefix : Number,
seller_city : String,
seller_state : String
}, {collection : "sellers"});

module.exports = mongoose.model("seller", seller_schema);