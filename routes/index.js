const express = require('express');
const router = express.Router();
const indexContorller = require('../controllers/index.controller');
const { isAuthenticated } = require('../middlewares/isAuthenticated');

/* GET home page. */
router.get('/', isAuthenticated, indexContorller.getHome);

module.exports = router;
