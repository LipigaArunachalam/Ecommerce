const {User} = require("../models");
const jwt = require("jsonwebtoken");
require("dotenv").config({path : "../../.env"});

module.exports = async(req, res, next) =>{
    try{
        const token = await req.header("Authorization")?.split(" ")[1];
        if(!token){
            return res.status(401).json({message : "unauthorized user"});
        } 
        const result = jwt.verify(token, process.env.SECRETKEY);
        const user = await User.findById(result.id);
        if(!user){
            return res.status(401).json({message : "user not found" });
        }
        res.status(200).json({message : "success"});
        next();
    } catch(err){
        res.status(500).json({error : err.message});
    }
};