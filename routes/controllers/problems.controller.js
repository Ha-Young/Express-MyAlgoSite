const Problem = require('../../models/Problem');

exports.getAll = async function(req, res, next) {
  try {
    const result = await Problem.find();
    return result;
  } catch (err) {
    console.log(err);
  }
};
