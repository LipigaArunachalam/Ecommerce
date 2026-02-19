var mongoose = require("mongoose");

const user_schema = mongoose.Schema({
    username : String,
    password : String,
    role : {type : String, required : true}
}, {collection : "users"});

module.exports = mongoose.model("user", user_schema);