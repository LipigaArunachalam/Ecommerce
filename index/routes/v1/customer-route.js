const express = require("express");
const router = express.Router();

const { customerController } = require("../../controllers/v1");

router.get("/custcount", customerController.custcount);


module.exports = router;