const express = require("express");
const { verifyUser } = require("./middlewares/verifyUser");
const { getAllProblems } = require("../controllers/indexController");
const router = express.Router();

router.get("/", verifyUser, getAllProblems);

module.exports = router;
