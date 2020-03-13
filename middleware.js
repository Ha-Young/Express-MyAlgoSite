const mongoose = require('mongoose');
require('dotenv').config();

const middlewares = {
  onMongoose: () => {
    mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });
  },

  setLocals: (req, res, next) => {
    res.locals.siteName = 'CodeWars';
    res.locals.loggedUser = req.user;
    next();
  },

  publicPage: (req, res, next) => {
    if (req.user) {
      res.redirect('/');
    } else {
      next();
    }
  },

  privatePage: (req, res, next) => {
    if (!req.user) {
      res.redirect('/login');
    } else {
      next();
    }
  },

  line: (req, res, next) => {
    console.log('<--------------------------------------------------------------------------------->');
    next();
  }
};

module.exports = middlewares;
