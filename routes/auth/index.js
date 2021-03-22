const express = require("express");

const regiesterController = require("../controllers/register.controller");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.render("login");
});

router.get("/register", (req, res, next) => {
  res.render("register");
});

router.post("/register", regiesterController.register);

module.exports = router;
