const {Seller} = require("../../models");

exports.getseller = async(req, res)=>{
   try{
        const result = await Seller.find({seller_city : req.params.seller_city, is_deleted : false}).limit(5).select("seller_id seller_state");
        if(result.length === 0){
            res.json({message : "no seller found in that city"});
        }else{
            res.status(200).json({message : "seller found" , result : result});
        }
    }catch(err){
        res.status(500).json({error : err.message});
    }
};

exports.addseller = async(req, res)=>{
    try{
        const result = await Seller.create(req.body);
        const upd = await Seller.updateOne({_id : result._id},{$set:{is_deleted : false}});
        res.json(result);
    }catch(err){
        res.status(500).status({error : err.message});
    }
};

exports.updseller = async(req, res)=>{
    try{ 
        const result = await Seller.updateMany({seller_city : "rio de janeiro", is_deleted : false}, {$set : {seller_state : "RJ"}});
        if(result.length ===0){
           res.json({message : "Everything is correct"});
        }
        res.status(200).json({message : "updated successfully"});
    }catch(err){
        res.status(500).status({error : err.message});
    }
};

exports.delseller = async(req, res)=>{
   try{
      const result = await Seller.updateOne({seller_zip_code_prefix : Number(req.body.seller_zip_code_prefix)},{is_deleted : true});
      if(!result){
        res.json({message : "zip code not found"});
      }else{
        res.status(200).json({message : "zip code deleted successfully" , result : result});
      }
   }catch(err){
      res.status(500).status({error : err.message});
   }
};

exports.getall = async(req, res)=>{
    try{
        const result = await Seller.find({is_deleted : false},{_id : 0}).limit(100);
        res.status(200).json({message : "all the data", result : result});
    }catch(err){
        res.status(500).json({error : err.message});
    }
};

exports.search = async(req, res)=>{
    try{
        const key = req.params.name;
        const result = await Seller.find({seller_city : {$regex : `^${key}` , $options : "i"} , is_deleted : false}).limit(100);
        res.status(200).json({message : "all the data", result : result});
    }catch(err){
        res.status(500).json({error : err.message});
    }
};