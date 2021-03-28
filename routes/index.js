const express = require("express");

const problemsController = require("./controllers/problems.controller");

const problemRouter = require("../routes/problems/index");
const authRouter = require("../routes/auth/index");
const authenticateUser = require("./middlewares/autheticate");

const router = express.Router();

router.get("/", authenticateUser, problemsController.getAllProblems);

router.use("/login", authRouter);

router.use("/problems", problemRouter);

module.exports = router;
