const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

const { userController } = require("../../controllers/v1");

router.post("/register", userController.register);

router.post("/login", userController.login);

module.exports = router;