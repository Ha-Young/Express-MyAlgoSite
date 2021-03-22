const express = require("express");
const loginController = require("./controllers/loginController");
const router = express.Router();

router.get("/", loginController.renderLoginPage);
router.post("/", loginController.createUser);

module.exports = router;
