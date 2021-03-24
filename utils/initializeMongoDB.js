const mongoose = require("mongoose");
const Problem = require("../models/Problem");
const data = require("../models/sample_problems.json");

async function initializeMongoDB(data) {
  for (let i = 0; i < data; i++) {
    await Problem.create(data[i]);
  }
}

module.exports = initializeMongoDB;
