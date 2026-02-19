const {payments} = require('../../models/index');

const paymentController ={
    
    getAllPaymentByPage: async (req, res) => {
        try{
            const paymentList = await payments.find({isDeleted: false});
            res.status(200).json({
                payment: paymentList
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
            const payment = await payments.findOne({_id: req.params.id, isDeleted: false});
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
            const payment = await payments.findOneAndUpdate(
                {_id: req.params.id, isDeleted: false},
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
            const payment = await payments.findOneAndUpdate(
                {_id: req.params.id, isDeleted: false},
                {isDeleted: true},
                {returnDocument:'after'}
            )
            if(!payment){
                return res.status(400).json({
                    message: "payment not found"
                })
            }
            res.status(200).json({
                message: "payment deleted successfully",
                payment: payment
            })
        }catch(error) {
            res.status(400).json({
                message: error.message
            })
        }
    }
};

module.exports = paymentController;