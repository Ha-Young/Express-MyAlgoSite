const express = require('express');
const router = express.Router();
const passport = require("passport");

const authenticateUser = require("./middlewares/authenticateUser");
const problemController = require("./controllers/problemController");

router.get(
  "/",
  authenticateUser,
  problemController.getAllProblems,
  (req, res, next) => {
    res.locals.name = req.user.name;
    res.render("index");
  }
);

router.get(
  "/:level",
  authenticateUser,
  problemController.getProblems,
  (req, res, next) => {
    res.locals.name = req.user.name;
    res.render("index");
  }
);

module.exports = router;
