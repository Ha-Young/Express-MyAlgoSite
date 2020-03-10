const mongoose = require('mongoose');

const middlewares = {
  onMongoose: () => {
    mongoose.connect('mongodb://localhost/codewars', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });
  },

  setLocals: (req, res, next) => {
    res.locals.siteName = 'CodeWars';
    res.locals.loggedUser = req.user || null;
    next();
  }
};

module.exports = middlewares;
