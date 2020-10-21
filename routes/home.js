/* eslint-disable no-unused-vars */
const express = require("express");
const jwt = require("jsonwebtoken");

const SECRET_KET = process.env.JWT_KEY;

const router = express.Router();

const athenticate = require("../middleware/athenticate");

router.get("/", athenticate, (req, res, next) => {
  jwt.verify(req.cookies.loginToken, SECRET_KET, (err, decoded) => {
    if (err) next(err);

    res.render("index", {
      userName: decoded.user.username,
    });
  });
});

module.exports = router;
