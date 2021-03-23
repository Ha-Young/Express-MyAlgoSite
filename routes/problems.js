const express = require("express");
const problemsController = require("./controllers/problemsController");
const router = express.Router();
const passport = require("passport");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  problemsController.renderProblemsPage
);

router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  problemsController.renderProblemsPage
);

module.exports = router;
