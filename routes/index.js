const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  const loginStatus = res.locals.loginStatus;
  let userName = "";

  if (req.user) userName = req.user.username;

  res.status(200).render("index", {
    userName,
    loginStatus,
  });
});

module.exports = router;
