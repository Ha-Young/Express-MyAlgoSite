const express = require("express");
const { login, loginGoogle, loginGoogleCallback } = require("../controllers/globalController");

const loginRouter = express.Router();

loginRouter.get("/", login);

loginRouter.get("/google", loginGoogle);
loginRouter.get("/google/callback", loginGoogleCallback);

module.exports = loginRouter;
