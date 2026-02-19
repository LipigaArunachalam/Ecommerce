const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

const { sellerController } = require("../../controllers/v1");

router.get("/get-seller/:seller_city", auth,sellerController.getseller);

router.post("/add-seller",auth,  sellerController.addseller);

router.put("/upd-seller", auth,sellerController.updseller);

router.delete("/del-seller", auth,sellerController.delseller);

module.exports = router;