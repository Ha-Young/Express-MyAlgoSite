const express = require("express");
const Problem = require("../models/Problem");
const authenticateUser = require("./middlewares/authenticateUser");
const router = express.Router();

router.get(
  "/:id",
  authenticateUser,
  async (req, res, next) => {
    const id = req.params.id;
    const problem = await Problem.find({ id });

    res.locals.problem = problem;
    res.render("problem");
  }
);

module.exports = router;
