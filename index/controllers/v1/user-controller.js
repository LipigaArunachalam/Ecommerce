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
                const token = jwt.sign({id : found._id ,role : found.role}, process.env.SECRETKEY, {expiresIn : "2m"});
                const reftoken = jwt.sign({id : found._id}, process.env.REFRESH_SECRET, {expiresIn:"7d"});
                found.refresh_token = reftoken;
                await found.save();
                res.status(200).json({message : "token created successfully", token :token, refresh : reftoken});
            }
            res.status(401).json({message : "incorrect password"});
       }
     } catch(err){
        res.status(500).json({error : err.message});
     }
};

exports.refresh = async(req, res)=>{
    try{
        const {refresh_token} = req.body;
        if(!refresh_token){
            res.json({message: "no refresh token found"});
        }
        const token = jwt.verify(refresh_token , process.env.REFRESH_SECRET);
        if(!token){
            res.json({message : "invalid token"});
        }
        const user = await User.findById({_id : token.id});
        if(!user){
            res.json("user not found");
        }
        const accesstoken = jwt.sign({id : user._id, role : user.role}, process.env.SECRETKEY);
        res.status(200).json({message : "access token generated",accessToken : accesstoken});
    }catch(err){
        res.status(500).json({error : err.message});
    }
}