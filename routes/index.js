const express = require('express');
const router = express.Router();

const authenticateUser = require("./middlewares/authenticateUser");
const problemController = require("./controllers/problemController");

router.get(
  "/",
  authenticateUser,
  problemController.getAllProblems,
  (req, res, next) => {
    res.render("index");
  }
);

router.get(
  "/:level",
  authenticateUser,
  problemController.getProblems,
  (req, res, next) => {
    res.render("index");
  }
);

module.exports = router;
