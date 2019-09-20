const express = require("express");
const router = express.Router();
const problemsController = require("./controller/problems.controller");

const authCheck = (req, res, next) => {
  if (!req.user) {
    res.redirect("/auth/login");
  } else {
    next();
  }
};

/* GET home page. */
router.get("/", authCheck, problemsController.getAll);

module.exports = router;
