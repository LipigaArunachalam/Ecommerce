const {orderItems} = require('../../models/index');

const orderItemController ={
    
    createOrderItem: async (req,res) => {
        try{
        const payload = req.body;
        const orderItem = await orderItems.create(payload);
        res.status(200).json({
            message: "order items created",
            orderItem: orderItem
        })
        }catch(error){
            res.status(400).json({
                message: error.message
            })
        }
    },

    getAllOrderItemsByPage: async (req,res) => {
        try{
            const  page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const skip = (page - 1) * limit;
            const orderItemList = await orderItems.find({isDeleted: false}).skip(skip).limit(limit);
            const totalOrderItems = await orderItems.countDocuments();
            res.status(200).json({
                orderItemList: orderItemList,
                totalOrderItems: totalOrderItems,
                page: page,
                limit: limit
            })
        }catch(error){
            res.status(400).json({
                message: error.message
            })  
        }
    },

    getOrderItem: async (req,res) => {
        try{
            const orderItem = await orderItems.findOne({_id: req.params.id, isDeleted: false});
            if(!orderItem){
                return res.status(400).json({
                    message: "order items not found"
                })
            }
            res.status(200).json({
                orderItem: orderItem
            })
        }catch(error){
            res.status(400).json({
                message: error.mesaage
            })
        }
    },
    updateOrderItem: async (req, res) => {
        try{
            const payload = req.body;
            const orderItem = await orderItems.findOneAndUpdate(
                {_id: req.params.id, isDeleted: false},
                payload,
                {returnDocument: 'after'}
            );
            if(!orderItem){
                return res.status(400).json({
                    message: "order items not found"
                })
            }
            res.status(200).json({
                message: "order item updated successfully"
            })

        }catch(error){
            res.status(400).json({
                message: error.mesaage
            })
        }
    },
    deleteOrderItem: async (req, res) => {
        try{
            const orderItem = await orderItems.findOneAndUpdate(
                {_id: req.params.id, isDeleted: false},
                {isDeleted: true},
                {returnDocument:'after'}
            );
            if(!orderItem){
                return res.status(400).json({
                    message: "order items not found"
                })
            }
            res.status(200).json({
                message: "order item deleted successfully",
                orderItem: orderItem
            })
        }catch(error){
            res.status(400).json({
                message: error.mesaage
            })
        }
    }

};

module.exports = orderItemController