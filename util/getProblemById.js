const Problem = require("../models/Problem");

module.exports = async (id) => {
  try {
    return await Problem.findById(id);
  } catch (err) {
    return null;
  }
};
