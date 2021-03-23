const express = require("express");
const globalRouter = express.Router();
const {
  home,
  logout,
} = require("../controllers/globalController");

/* GET home page. */
globalRouter.get("/", home);

globalRouter.get("/logout", logout);

module.exports = globalRouter;
