const express = require("express");

const auth = require("./auth");
const loginCheck = require("./middlewares/loginCheck");
const { home } = require("./controllers/home");

module.exports = function () {
  const app = express.Router();
  app.get("/", loginCheck, home);

  auth(app);

  return app;
};
