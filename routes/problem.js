const express = require("express");
const problemController = require("./controllers/problemController");
const router = express.Router();
const passport = require("passport");

router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  problemController.renderProblemPageById
);

module.exports = router;
