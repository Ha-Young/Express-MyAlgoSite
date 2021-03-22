const express = require('express');

const auth = require('./auth');
const { home } = require('../controllers/home');

module.exports = function () {
  const app = express.Router();
  app.get('/', home);

  auth(app);

  return app;
};
