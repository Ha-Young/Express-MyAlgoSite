const express = require("express");
const router = express.Router();

const authController = require("./controllers/auth.controller");

router.get("/", authController.localJoin);
router.post("/", authController.postUserData);

module.exports = router;
