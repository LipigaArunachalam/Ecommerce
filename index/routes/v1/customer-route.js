const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

const { customerController } = require("../../controllers/v1");

router.get("/custcount",auth(["user", "admin"]), customerController.custcount);

router.get("/get-all",auth(["user", "admin"]),customerController.getall);

router.get("/search/:name",auth(["user", "admin"]),customerController.search);

module.exports = router;