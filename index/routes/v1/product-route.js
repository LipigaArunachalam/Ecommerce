const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

const { productController } = require("../../controllers/v1");

router.post("/add-product", auth(["admin"]),productController.addproduct);

router.get("/get-product",auth(["user", "admin"]), productController.getproduct);

router.put("/upd-product", auth(["admin"]),productController.updproduct);

router.delete("/del-product",auth([ "admin"]), productController.delproduct);

module.exports = router;