const express = require("express");
const signInController = require("./controllers/signInController");
const validationHandler = require("./middlewars/validationHandler");
const router = express.Router();

router.get("/", signInController.renderSigninPage);
router.post("/", validationHandler.register, signInController.createUser);

module.exports = router;
