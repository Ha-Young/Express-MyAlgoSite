const router = require('express').Router();

const indexController = require(`${__dirname}/controllers/index.controller`);

router.get('/', indexController.getHome);

module.exports = router;
