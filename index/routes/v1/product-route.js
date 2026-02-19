const express = require("express");
const router = express.Router();

const { productController } = require("../../controllers/v1");

router.post("/add-product", productController.addproduct);

router.get("/get-product", productController.getproduct);

router.put("/upd-product", productController.updproduct);

router.delete("/del-product", productController.delproduct);

module.exports = router;