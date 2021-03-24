const express = require("express");
const { home, getProblemDetail, postSolution } = require("../controllers/problemController");
const { logout } = require("../controllers/userController");
const globalRouter = express.Router();

/* GET home page. */
globalRouter.get("/", home);

globalRouter.get("/logout", logout);

globalRouter.get("/problems/:id", getProblemDetail);
globalRouter.post("/problems/:id", postSolution);

module.exports = globalRouter;
