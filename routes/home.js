const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.render("index", {
    name: req.user?.name || "guest",
  });
});

module.exports = router;
