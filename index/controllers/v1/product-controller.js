const {Product} = require("../../models");

exports.addproduct = async(req, res) =>{
     try{
        const result = await Product.create(req.body);
        const upd = await Product.updateOne({_id : result._id},{$set:{is_deleted : false}});
        res.json(result);
     }
     catch(err){
          res.status(500).json({ error : err.message});
     }
};

exports.getproduct = async(req, res) =>{
     try{
          const result = await Product.find({product_category_name :req.body.product_category_name, is_deleted : false}).select("-_id");
          const count = await Product.countDocuments({product_category_name :req.body.product_category_name, is_deleted: false});
          if(result.length===0){
               res.json({message :"not found invalid"});
          }
          res.status(200).json({ count : count, result : result});
     }
     catch(err){
          res.status(500).json({error : err.message});
     }
};

exports.updproduct = async(req, res)=>{
     try{
         const result = await Product.findOneAndUpdate({ product_id : req.body.product_id, is_deleted : false} , 
          {product_photos_qty : req.body.product_photos_qty}, {returnDocument : "after"});
          if(result.length === 0){
               res.status(404).json({message:"not found"});
          }
         res.status(200).json({message : "done updating"});
     }catch(err){
          res.status(500).json({error : err.message});
     }
};

exports.delproduct = async(req,res) =>{
     try{
          const result = await Product.updateMany({product_photos_qty : {$gt : 17}},{$set : {is_deleted : true}}, {returnDocument : "after"});
          if(!result){
               res.status(404).json({message : "nothing found"});
          }else{
               res.status(200).json({message: "deleted successfully"});
          }
     } catch(err){
          res.status(500).json({error : err.message});
     }
};

exports.getall = async(req, res)=>{
    try{
        const result = await Product.find({is_deleted : false},{_id : 0}).limit(100);
        res.status(200).json({message : "all the data", result : result});
    }catch(err){
        res.status(500).json({error : err.message});
    }
};

exports.search = async(req, res)=>{
    try{
        const key = req.params.name;
        const result = await Product.find({product_category_name : {$regex : key , $options : "i"} , is_deleted : false}).limit(100);
        res.status(200).json({message : "all the data", result : result});
    }catch(err){
        res.status(500).json({error : err.message});
    }
};