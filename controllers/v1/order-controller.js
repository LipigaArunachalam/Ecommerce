const {orders} = require('../../models/index');

const orderController = {
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
            const order = await orders.findById(req.params.id);
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
            const order = await orders.findByIdAndUpdate(
                req.params.id,
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
            const order = await orders.findByIdAndDelete(req.params.id);
            if(!order) {
                return res.status(400).json({
                    message: error.message
                })
            }
            res.status(200).json({
                message: "order deleted",
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