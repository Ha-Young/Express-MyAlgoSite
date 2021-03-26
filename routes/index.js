const express = require("express");
const passport = require("passport");

const router = express.Router();

const indexController = require("./controllers/indexController");

router.get(
  "/",
  function (req, res, next) {
    passport.authenticate(
      "jwt",
      { session: false },
      function (err, user, info) {
        if (err) {
          return next(err);
        }

        if (!user) {
          return next();
        }

        return res.redirect("/problems");
      }
    )(req, res, next);
  },
  indexController.renderIndexPage
);

module.exports = router;
