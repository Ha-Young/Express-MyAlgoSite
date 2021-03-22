const express = require('express');


const app = express();

(async function () {
  await require('./loaders')({ expressApp: app });
})();

module.exports = app;
