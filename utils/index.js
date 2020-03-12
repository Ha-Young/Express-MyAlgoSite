const User = require('../models/User');
const Problem = require('../models/Problem');

const setProblems = async (req, res, condition) => {
  try {
    return await Problem.find(condition);
  } catch (error) {
    return res.status(500).render('error', { message: 'fail to find problems', error });
  };
};

const setMainPageMessage = async (req, res) => {
  if (req.isAuthenticated()) {
    try {
      const user = await User.findById(req.session.passport.user);
      return `Hello, ${user.displayName}`;
    } catch (error) {
      return res.status(500).render('error', { error: 'fail to find user' });
    };
  } else {
    return '';
  }
};

const setProblemById = async (req, res) => {
  try {
    return await Problem.findById(req.params.problem_id);
  } catch (error) {
    return res.status(500).render('error', { error: 'fail to find problem' });
  }
};

module.exports = {
  setProblems,
  setMainPageMessage,
  setProblemById
}
