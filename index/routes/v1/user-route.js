const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

const { userController } = require("../../controllers/v1");

router.post("/register",auth, userController.register);

router.post("/login", auth, userController.login);

module.exports = router;