const express = require('express');
const router = express.Router();

module.exports = function (passport) {
  const loginController = require("../controllers/login.controller")(passport);

  router
    .route('/')
    .get(loginController.getLoginForm)
    .post(loginController.authenticate);

  return router;
}
