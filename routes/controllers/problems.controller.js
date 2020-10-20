const Problem = require('../../models/Problem');

exports.getAll = async function(req, res, next) {
  try {
    const result = await Problem.find();

    return result;
  } catch (err) {
    next(err);
  }
};

exports.getOne = async function(req, res, next) {
  try {
    const result = await Problem.find(req.params);
    console.log(result[0].title);
    res.render(
      'problem',
      {
        title: result[0].title,
        description: result[0].description,
        tests: result[0].tests,
      }
    );
  } catch (err) {
    next(err);
  }
};
