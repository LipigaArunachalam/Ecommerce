const {Payment} = require('../../models/index');
const { ObjectId } =  require('mongodb');

const paymentController ={
    
    getAllPaymentByPage: async (req, res) => {
        try{
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const skip  = (page -1) * limit;
            const paymentList = await Payment.find({is_deleted: false}).skip(skip).limit(limit);
            const totalPayments = await Payment.countDocuments();
            const totalPages = Math.ceil(totalPayments / limit);
            res.status(200).json({
                paymentList: paymentList,
                totalPayments: totalPayments,
                totalPages: totalPages,
                currentPage: page
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
            const payment = await Payment.create(payload);
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

    getAllPayment: async (req, res) => {
        try {
            const paymentList = await Payment.find({is_deleted: false});        
            res.status(200).json({
                paymentList: paymentList
            })
        }   catch(error) {
            res.status(400).json({
                message: error.message
            })
        }
    },

    getPayment: async (req, res) => {
        try {
            const payment = await Payment.findOne({_id: new ObjectId(req.params.id), is_deleted: false});
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
            const payment = await Payment.findOneAndUpdate(
                {_id: new ObjectId(req.params.id), is_deleted: false},
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
            const payment = await Payment.findOneAndUpdate(
                {_id: new ObjectId(req.params.id), is_deleted: false},
                {is_deleted: true},
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
    },
    searchPayment: async (req, res) => {
        try {
            const key = req.params.type;
            const result = await Payment.find({
                payment_type : {$regex : `^${key}$` , $options : "i"},
                is_deleted : false}).limit(100);
            res.status(200).json({
                message : "all the data", 
                result : result
            });
        }catch(error) {
            res.status(400).json({
                message: error.message
            })
        }
    }

};

module.exports = paymentController;