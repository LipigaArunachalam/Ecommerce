const {User} = require("../../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config({path: "../../.env"});

exports.register = async(req, res)=>{
   try{
       const{username , password , role } = req.body;
       const hashedp = await bcrypt.hash(password, 10);
       const register = await User.create({username, password : hashedp, role});
       const upd = await User.updateOne({_id : register._id},{$set:{is_deleted : false}});
       res.status(200).json({message: "user created"});
   } catch(err){
       res.status(500).json({error : err.message});
   }
};

exports.login = async(req,res)=>{
     try{
        const found = await User.findOne({username : req.body.username});
        if(!found){
            res.status(401).json({error : "not found"});
        }else{
            const result = await bcrypt.compare(req.body.password, found.password);
            if(result){
                const token = jwt.sign({id : found._id ,role : found.role}, process.env.SECRETKEY, {expiresIn : "5h"});
                res.status(200).json({message : "token created successfully", token :token});
            }
            res.status(401).json({message : "incorrect password"});
       }
     } catch(err){
        res.status(500).json({error : err.message});
     }
};