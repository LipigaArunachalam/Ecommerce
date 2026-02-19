const {Product} = require("../../models");

exports.addproduct = async(req, res) =>{
     try{
        const result = await Product.create(req.body);
        res.json(result);
     }
     catch(err){
          res.status(500).json({ error : err.message});
     }
};

exports.getproduct = async(req, res) =>{
     try{
          const result = await Product.find({product_category_name :req.body.product_category_name});
          const count = await Product.countDocuments({product_category_name :req.body.product_category_name});
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
         const result = await Product.findOneAndUpdate({ product_id : req.body.product_id} , 
          {product_photos_qty : req.body.product_photos_qty}, {returnDocument : "after"});
         res.status(200).json({message : "done updating"});
     }catch(err){
          res.status(500).json({error : err.message});
     }
};

exports.delproduct = async(req,res) =>{
     try{
          const result = await Product.deleteMany({product_photos_qty : {$gt : 19}});
          if(!result){
               res.status(404).json({message : "nothing found"});
          }else{
               res.status(200).json({message: "deleted successfully"});
          }
     } catch(err){
          res.status(500).json({error : err.message});
     }
}