const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

const { sellerController } = require("../../controllers/v1");

router.get("/get-seller/:seller_city", auth(["user", "admin"]),sellerController.getseller);

router.post("/add-seller",auth([ "admin"]),  sellerController.addseller);

router.put("/upd-seller", auth(["admin"]), sellerController.updseller);

router.put("/del-seller", auth(["admin"]), sellerController.delseller);

router.get("/get-all",auth(["user", "admin"]),sellerController.getall);

router.get("/search/:name",auth(["user", "admin"]),sellerController.search);

module.exports = router;