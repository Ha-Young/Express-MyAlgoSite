const express = require("express");
const router = express.Router();

const authController = require("./controllers/auth.controller");

router.get("/", authController.getLocalJoin);
router.post("/", authController.postLocalJoin);

module.exports = router;
