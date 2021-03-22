const express = require("express");
const passport = require("passport");
const globalRouter = express.Router();
const {
  home,
  getLogin,
  postLogin,
  logout,
  getJoin,
  postJoin
} = require("../controllers/globalController");

/* GET home page. */
globalRouter.get("/", home);

globalRouter.get("/login", getLogin);
globalRouter.post("/login", postLogin);

globalRouter.get("/join", getJoin);
globalRouter.post("/join", postJoin);

globalRouter.get("/logout", logout);

globalRouter.get("/login/google",
  passport.authenticate("google", { scope: ["profile"] })
);
globalRouter.get("/login/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    successRedirect: "/",
  }),
);

module.exports = globalRouter;
