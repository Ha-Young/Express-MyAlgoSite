const express = require("express");
const signInController = require("./controllers/signInController");
const router = express.Router();

router.get("/", signInController.renderSigninPage);
router.post("/", signInController.createUser);

module.exports = router;
