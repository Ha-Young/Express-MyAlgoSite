const router = require("express").Router();

const Problem = require("../models/Problem");
const authenticateUser = require("./middlewares/authenticateUser");

router.get(
  "/:id",
  authenticateUser,
  async (req, res, next) => {
    const id = req.params.id;
    const problem = await Problem.find({ id }).lean();

    res.locals.problem = problem[0];

    res.locals.rest = JSON.stringify(problem[0]);
    res.render("problem");
  }
);

router.post(
  "/:id",
  authenticateUser,
  async (req, res, next) => {
    const prevCode = req.body.code;
    const id = req.params.id;
    const problem = await Problem.find({ id }).lean();

    console.log(prevCode);

    res.locals.prevCode = prevCode;
    res.locals.problem = problem[0];
    res.render("failure");
  }
);

module.exports = router;
