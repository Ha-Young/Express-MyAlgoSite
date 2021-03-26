const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  let userName = "";

  if (req.user) userName = req.user.username;

  res.status(200).render("index", {
    userName,
    loginStatus: res.locals.loginStatus,
  });
});

module.exports = router;
