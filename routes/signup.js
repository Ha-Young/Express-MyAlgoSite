const express = require("express");
const router = express.Router();

const authController = require("./controllers/authController");

router.get("/", authController.renderSignup);
router.post("/", authController.signup);

module.exports = router;
