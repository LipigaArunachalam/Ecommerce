var mongoose = require("mongoose");

const product_schema = mongoose.Schema({
    

product_id : {type: String, unique : true},
product_category_name : String,
product_photos_qty : Number,
product_weight_g: Number,
product_length_cm : Number,
product_height_cm : Number,
product_width_cm : Number
}, {collection : "products"});

module.exports = mongoose.model("product", product_schema);