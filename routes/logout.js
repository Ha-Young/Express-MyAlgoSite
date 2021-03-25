const router = require("express").Router();

router.get("/", (req, res, next) => {
  req.logout();
  res.app.locals.isLogin = false;

  return res.redirect("/");
});

module.exports = router;