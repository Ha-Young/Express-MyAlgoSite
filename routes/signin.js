const express = require("express");
const router = express.Router();

const signinController = require("./controllers/signinController");
const validationHandler = require("./middlewars/validationHandler");

router.get("/", signinController.renderSigninPage);
router.post("/", validationHandler.register, signinController.createUser);

module.exports = router;
