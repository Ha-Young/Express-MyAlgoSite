const express = require("express");
const logInController = require("./controllers/loginController");
const router = express.Router();
const authHandler = require("../routes/middlewars/authHandler");

router.get("/", logInController.renderLoginPage);
router.post("/auth/tokens", authHandler.signToken);

module.exports = router;
