const {orders} = require('../../models/index');

const orderController = {
    
    getAllOrdersByPage: async (req, res) => {
        try{
            const page = parseInt(req.query.page) || 1;
             
            const limit = parseInt(req.query.limit) || 10; 

            const skip = (page - 1) * limit;

            const orderList = await orders.find({isDeleted: false}).skip(skip).limit(limit);

            const totalOrders = await orders.countDocuments();
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
            const order = await orders.create(payload);
            res.status(200).json({
                    message: "order successfull",
            })
        }catch(error){
            res.status(400).json({
                success: false,
                message: error.message
            })
        }
    },
    getOrder: async (req, res) => {
        try{
            const order = await orders.findOne({_id: req.params.id, isDeleted: false});
            if(!order){
                return res.status(400).json({
                    message: "order not found"
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
            const order = await orders.findOneAndUpdate(
                {_id: req.params.id, isDeleted: false},
                req.body,
                {returnDocument: 'after'}
            );
            if(!order){
                return res.status(400).json({
                    message: "order not found"
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
            const order = await orders.findOneAndUpdate(
                {_id: req.params.id, isDeleted: false},
                {isDeleted: true},
                {returnDocument:'after'}
            );
            if(!order) {
                return res.status(400).json({
                    message: "order not found"
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
    }
}

module.exports = orderController;