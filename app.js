const express = require('express');


var app = express();

(async function () {
  await require('./loaders')({ expressApp: app });
})();

module.exports = app;
