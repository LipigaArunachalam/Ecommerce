const express = require("express");
const router = express.Router();

const { userController } = require("../../controllers/v1");

router.post("/register", userController.register);

router.post("/login", userController.login);

router.post("/refresh",userController.refresh);

module.exports = router;
