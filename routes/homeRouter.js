const express = require("express");
const { home, getProblemDetail, postSolution, getProblemsByLevel } = require("../controllers/problemController");
const { logout } = require("../controllers/userController");
const homeRouter = express.Router();

/* GET home page. */
homeRouter.get("/", home);

homeRouter.get("/logout", logout);

homeRouter.get("/problems/level/:level", getProblemsByLevel);

homeRouter.get("/problems/:id", getProblemDetail);
homeRouter.post("/problems/:id", postSolution);

module.exports = homeRouter;
