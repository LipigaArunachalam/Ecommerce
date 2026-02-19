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
    getOrderItem: async (req,res) => {
        try{
            const orderItem = await orderItems.findById(req.params.id);
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
            const orderItem = await orderItems.findByIdAndUpdate(
                req.params.id,
                req.body,
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
            const orderItem = await orderItems.findByIdAndDelete(req.params.id);
            if(!orderItem){
                return res.status(400).json({
                    message: "order items not found"
                })
            }
            res.status
        }catch(error){
            res.status(400).json({
                message: error.mesaage
            })
        }
    }

};

module.exports = orderItemController