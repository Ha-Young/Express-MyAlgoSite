const express = require("express");
const router = express.Router();
const problemsController = require("./controllers/problems.controller");

router.get(
  "/",
  (req, res, next) => {
    if (req.user) {
      next();
    } else {
      res.redirect("/login");
    }
  },
  problemsController.getAll
);

module.exports = router;
