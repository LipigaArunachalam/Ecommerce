const {User} = require("../../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config();

exports.register = async(req, res)=>{
   try{
       const{username , password , role } = req.body;
       const hashedp = await bcrypt.hash(password, 10);
       const register = await User.create({username, password : hashedp, role});
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
            const result = bcrypt.compare(req.body.password, found.password);
            if(result){
                const token = jwt.sign({id : result._id}, process.env.SECRETKEY, {expiresIn : "1h"});
                res.status(200).json({message : "token created successfully", token :token});
            }
       }
     } catch(err){
        res.status(500).json({error : err.message});
     }
};