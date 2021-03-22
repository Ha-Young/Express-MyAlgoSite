const express = require('express');

const router = express.Router();

const indexController = require(`${__dirname}/controllers/index.controller`);
console.log(indexController)
/* GET home page. */
router.get('/', indexController.getHome);

module.exports = router;
