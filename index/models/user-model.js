var mongoose = require("mongoose");

const user_schema = mongoose.Schema({
    username : String,
    password : String,
    role : {type : String, required : true},
    refresh_token: String,
    is_deleted : {type : Boolean, default : false, select : false}
}, {collection : "users"});

module.exports = mongoose.model("user", user_schema);