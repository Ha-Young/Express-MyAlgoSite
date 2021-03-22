const express = require('express');
const globalRouter = express.Router();
const { home, login } = require("../controllers/globalController");

/* GET home page. */
globalRouter.get("/", home);
globalRouter.get("/login", login);

module.exports = globalRouter;
