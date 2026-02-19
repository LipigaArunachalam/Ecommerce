const express = require("express");
const router = express.Router();

const { sellerController } = require("../../controllers/v1");

router.get("/get-seller/:seller_city", sellerController.getseller);

router.post("/add-seller", sellerController.addseller);

router.put("/upd-seller", sellerController.updseller);

router.delete("/del-seller", sellerController.delseller);

module.exports = router;