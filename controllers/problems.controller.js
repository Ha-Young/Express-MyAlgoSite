const ObjectId = require('mongoose').Types.ObjectId;
const Problem = require('../models/Problem');

const problemsController = {
  getProblem: async (req, res) => {
    const id = req.params.problem_id;
    const problem = await Problem.findById(ObjectId(id));

    res.render('problem', { problem });
  }
};

module.exports = problemsController;
