const express = require('express');


var app = express();

(async function () {
  await require('./src/loaders')({ expressApp: app });
})();

module.exports = app;
