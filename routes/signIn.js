const express = require("express");
const router = express.Router();

const signInController = require("./controllers/signInController");
const validationHandler = require("./middlewars/validationHandler");

router.get("/", signInController.renderSigninPage);
router.post("/", validationHandler.register, signInController.createUser);

module.exports = router;
