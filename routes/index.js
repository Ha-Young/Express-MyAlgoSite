const express = require('express');
const router = express.Router();
const indexController = require('../routes/controllers/index.controller');
/* GET home page. */
router.get('/', indexController.getAll);

module.exports = router;
