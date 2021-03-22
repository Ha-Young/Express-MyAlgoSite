const express = require("express");
const userController = require("./controllers/userController");
const router = express.Router();
const passport = require("passport");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  userController.renderUserPage
);

module.exports = router;
