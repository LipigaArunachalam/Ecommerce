const {Customer} = require("../../models");

exports.custcount = async(req, res) =>{
    try{
        const result = await Customer.aggregate([{
            $group: {
               _id: "$customer_state",
               count: { $sum: 1 }
            }
    }, {
            $project: {
               state: "$_id",
               count: 1,
               _id: 0
            }
    }, {
            $sort: { count: -1 }
    } ]);
        res.status(200).json({message : "success", result : result});
    } catch(err){
        res.status(500).json({error : err.message});
    }
};

exports.getall = async(req, res)=>{
    try{
        const result = await Customer.find({is_deleted : false},{_id : 0, customer_unique_id:0}).limit(100);
        res.status(200).json({message : "all the data", result : result});
    }catch(err){
        res.status(500).json({error : err.message});
    }
};


exports.search = async(req, res)=>{
    try{
        const key = req.params.name;
        const result = await Customer.find({customer_state : {$regex : `^${key}$` , $options : "i"} , is_deleted : false}).limit(100);
        res.status(200).json({message : "all the data", result : result});
    }catch(err){
        res.status(500).json({error : err.message});
    }
};