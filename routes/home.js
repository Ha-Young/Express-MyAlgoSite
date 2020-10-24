const express = require("express");

const router = express.Router();

router.get("/", (req, res, next) => {
  const loginToken = req.cookies.loginToken;

  res.render("index", {
    userName: loginToken.user.username,
  });
});

module.exports = router;
