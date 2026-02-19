const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

const { productController } = require("../../controllers/v1");

router.post("/add-product", auth,productController.addproduct);

router.get("/get-product",auth, productController.getproduct);

router.put("/upd-product", auth,productController.updproduct);

router.delete("/del-product",auth, productController.delproduct);

module.exports = router;