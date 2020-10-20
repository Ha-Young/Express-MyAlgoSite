const fetch = require('node-fetch');
const Problem = require('../models/Problem');

const indexController = {
  getHome: async (req, res, next) => {

    const problems = await Problem.find({});

    res.render('index', { title: '바닐라코딩', problems});
  }
};

module.exports = indexController;
