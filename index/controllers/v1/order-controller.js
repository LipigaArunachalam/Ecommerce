const {Order} = require('../../models/index');
const  { ObjectId } =  require('mongodb');

const orderController = {
    
    getAllOrdersByPage: async (req, res) => {
        try{
            const page = parseInt(req.query.page) || 1;
             
            const limit = parseInt(req.query.limit) || 10; 

            const skip = (page - 1) * limit;

            const orderList = await Order.find({is_deleted: false}).skip(skip).limit(limit);

            const totalOrders = await Order.countDocuments({is_deleted: false});
            const totalPages = Math.ceil(totalOrders / limit);
            res.status(200).json({
                orders: orderList,
                totalOrders: totalOrders,
                totalPages: totalPages,
                currentPage: page
            })
        }catch(error){
            res.status(400).json({
                message: error.message
            })
        }
    },
    createOrder: async (req, res) => {
        try{
            const payload = req.body;
            const order = await Order.create(payload);
            res.status(200).json({
                    message: "order successfull",
                    order: order
            })
        }catch(error){
            res.status(400).json({
                success: false,
                message: error.message
            })
        }
    },
    getAllOrders: async (req,res) => {
        try{
            const orderList = await Order.find({is_deleted : false});
            res.status(200).json({
                orderList: orderList
            })
        }catch(error){
            res.status(400).json({
                message: error.message
            })
        }
    },

    getOrder: async (req, res) => {
        try{
            const order = await Order.findOne({_id: new ObjectId(req.params.id), is_deleted: false});
            if(!order){
                return res.status(400).json({
                    message: "get order not found"
                })
            }
            res.status(200).json({
                order: order
            })
        }catch(error){
            res.status(400).json({
                message: error.message
            })
        }
    },
    updateOrder: async (req, res) => {
        try{
            const order = await Order.findOneAndUpdate(
                {_id: new ObjectId(req.params.id), is_deleted: false},
                req.body,
                {returnDocument: 'after'}
            );
            if(!order){
                return res.status(400).json({
                    message: "update order not found"
                })
            }
            res.status(200).json({
                message: "order updated",
                order: order
            })
        }catch(error){
            res.status(400).json({
                message: error.message
            })
        }
    },
    deleteOrder: async (req,res) => {
        try{
            const order = await Order.findOneAndUpdate(
                {_id: new ObjectId(req.params.id), is_deleted: false},
                {is_deleted: true},
                {returnDocument:'after'}
            );
            if(!order) {
                return res.status(400).json({
                    message: "delete order not found"
                })
            }
            res.status(200).json({
                message: "order deleted successfully",
                order: order
            })
        }catch(error) {
            res.status(400).json({
                message: error.message
            })
        }
    },
    searchOrder: async(req,res) => {
        try{
            const key = req.params.status;
            const result = await Order.find({
                order_status : {$regex : `^${key}$` , $options : "i"},
                is_deleted : false}).limit(100);
            res.status(200).json({
                message : "all the data", 
                result : result
            });
        }
        catch(error){
            res.status(400).json({
                message: error.message
            })
        }
    }
}

module.exports = orderController;