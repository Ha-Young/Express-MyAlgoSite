const express = require('express');
const globalRouter = express.Router();
const { home } = require("../controllers/globalController");

/* GET home page. */
globalRouter.get('/', home);

module.exports = globalRouter;
