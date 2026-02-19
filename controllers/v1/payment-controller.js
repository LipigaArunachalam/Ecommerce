const {payments} = require('../../models/index');

const paymentController ={
    getAllPayment: async (req, res) => {
        try{
            const payment = await payments.find();
            res.status(200).json({
                payment: payment
            })
        }catch(error){
            res.status(400).json({
                message: error.message
            })
        }
    },

    createPayment: async (req, res) => {
        try {
            const payload = req.body;
            const payment = await payments.create(payload);
            res.status(200).json({
                message: "payment created",
                payment: payment
            })
        }catch(error) {
            res.status(400).json({
                message: error.message
            })
        }
    },
    getPayment: async (req, res) => {
        try {
            const payment = await payments.findById(req.params.id);
            if(!payment){
                return res.status(400).json({
                    message: "payment not found"
                })
            }
            res.status(200).json({
                payment: payment
            })
        }catch(error) {
            res.status(400).json({
                message: error.message
            })
        }
    },
    updatePayment: async (req, res) => {
        try {
            const payment = await payments.findByIdAndUpdate(
                req.params.id,
                req.body,
                {returnDocument:'after'}
            )
            if(!payment){
                return res.status(400).json({
                    message: "payment not found"
                })
            }
            res.status(200).json({
                message: "payment Updated",
                payment: payment
            })
        }catch(error) {
            res.status(400).json({
                message: error.message
            })
        }
    },
    deletePayment: async (req, res) => {
        try {
            const payment = await payments.findByIdAndDelete(
                req.params.id,
                req.body,
                {returnDocument:'after'}
            )
            if(!payment){
                return res.status(400).json({
                    message: "payment not found"
                })
            }
            res.status(200).json({
                message: "payment deleted"
            })
        }catch(error) {
            res.status(400).json({
                message: error.message
            })
        }
    }
};

module.exports = paymentController;