const express = require("express");
const router = express.Router();

const passport = require("passport");

const problemController = require("./controllers/problems.controller");
const { isAuthenticated, isNotAuthenticated } = require("./middlewares/authorization");

router.post("/login", passport.authenticate("local", { failureRedirect: "/login" }), // success일때 바로 리다이렉트 하게.. 바꾸기..?
  (req, res) => {
    res.redirect("/");
  },
);

router.get("/logout", isAuthenticated, (req, res, next) => { // profile로 옮겨주기..
  req.logout();
  res.redirect("/login");
});

router.get("/", isAuthenticated, problemController.getAll);

module.exports = router;
