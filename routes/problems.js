const router = require("express").Router();
const mongoose = require("mongoose");

const Problem = require("../models/Problem");
const User = require("../models/User");
const authenticateUser = require("./middlewares/authenticateUser");
const problemController = require("./controllers/problemController");

router.get(
  "/:id",
  authenticateUser,
  async (req, res, next) => {
    const id = req.params.id;
    const problem = await Problem.findOne({ id }).lean();
    const userProblem = await User.aggregate([
      {
        $match: { _id: mongoose.Types.ObjectId(req.user.id) }
      },
      {
        $unwind: "$problems"
      },
      {
        $match: { "problems.id": Number(id) }
      }
    ]);

    if (userProblem.length !== 0) {
      problem.code = userProblem[0].problems.code;
    }

    res.locals.problem = problem;
    res.render("problem");
  }
);

router.post(
  "/:id",
  authenticateUser,
  problemController.renderResult,
);

module.exports = router;
