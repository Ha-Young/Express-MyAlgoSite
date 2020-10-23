const Problem = require('../models/Problem');

const indexController = {
  getHome: async (req, res, next) => {
    const problems = await Problem.find({});

    res.locals.isAuthenticated = true,
    res.locals.username = req.user[0].username;

    console.log('req.user! =>', req.user);

    res.render('index', {
      title: '바닐라코딩',
      problems,
    });
  }
};

module.exports = indexController;
