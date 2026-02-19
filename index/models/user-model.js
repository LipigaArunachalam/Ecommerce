var mongoose = require("mongoose");

const user_schema = mongoose.Schema({
    username : String,
    password : String,
    role : String
}, {collection : "users"});

module.exports = mongoose.model("user", user_schema);