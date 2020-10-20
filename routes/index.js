const express = require('express');
const router = express.Router();
const indexController = require('../controllers/index.controller');
/* GET home page. */
router.get('/', indexController.getAll);

module.exports = router;
