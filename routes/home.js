const express = require("express");
const jwt = require("jsonwebtoken");

const { JwtError } = require("../service/error");

const SECRET_KET = process.env.JWT_KEY;

const router = express.Router();

router.get("/", (req, res, next) => {
  const loginToken = req.cookies.loginToken;

  res.render("index", {
    userName: user.user.username,
  });
});

module.exports = router;
