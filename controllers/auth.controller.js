const User = require('../models/User');

module.exports = {
  renderLogin: (req, res, next) => {
    const isAuthenticated = req.isAuthenticated();

    console.log(req.session);

    res.render('login', {
      isAuthenticated,
    });
  },

  logout: async (req, res, next) => {
    try {
      // console.log(req.session);
      // req.session = null;
      // console.log('is session detroyed? => ', req.session);

      req.logout();

      // await User.deleteMany({});

      // console.log('succesfully removed the whole session data from MongoDB');

      res.redirect('/');
    } catch (err) {
      if (err) next(err);
    }
  }
};
