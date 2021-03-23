const express = require("express");
const logInController = require("./controllers/loginController");
const router = express.Router();
const validationHandler = require("./middlewars/validationHandler");
const authHandler = require("../routes/middlewars/authHandler");

router.get("/", logInController.renderLoginPage);
router.post("/auth/tokens", validationHandler.login, authHandler.signToken);

module.exports = router;
