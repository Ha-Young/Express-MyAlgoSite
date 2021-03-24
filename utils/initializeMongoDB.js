const Problem = require("../models/Problem");

async function initializeMongoDB(data) {
  for (let i = 0; i < data.length; i++) {
    await Problem.create(data[i]);
  }
}

module.exports = initializeMongoDB;
