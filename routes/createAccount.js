const express = require("express");
const router = express.Router();

const createAccountController = require("../controller/createAccount.controller");

router.get("/", createAccountController.get);

router.post("/new", createAccountController.create);

module.exports = router;
