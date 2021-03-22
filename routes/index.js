const express = require('express');
const globalRouter = express.Router();
const { home, getLogin, postLogin } = require("../controllers/globalController");

/* GET home page. */
globalRouter.get("/", home);
globalRouter.get("/login", getLogin);
globalRouter.post("/login", postLogin)

module.exports = globalRouter;
