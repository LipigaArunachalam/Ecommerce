const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

const { customerController } = require("../../controllers/v1");

router.get("/custcount",auth, customerController.custcount);


module.exports = router;