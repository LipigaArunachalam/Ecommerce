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