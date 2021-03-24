const router = require("express").Router();

const Problem = require("../models/Problem");
const authenticateUser = require("./middlewares/authenticateUser");
const problemController = require("./controllers/problemController");

router.get(
  "/:id",
  authenticateUser,
  async (req, res, next) => {
    const id = req.params.id;
    const problem = await Problem.findOne({ id }).lean();

    res.locals.problem = problem;

    res.locals.rest = JSON.stringify(problem);
    res.render("problem");
  }
);

router.post(
  "/:id",
  authenticateUser,
  problemController.renderResult,
);

module.exports = router;
