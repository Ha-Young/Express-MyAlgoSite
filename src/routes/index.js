const express = require("express");

const authRouter = require("./auth");
const problemRouter = require("./problem");
const loginCheck = require("./middlewares/loginCheck");
const { home } = require("./controllers/home");

module.exports = function () {
  const app = express.Router();
  app.get("/", loginCheck, home);

  authRouter(app);
  problemRouter(app);

  return app;
};
