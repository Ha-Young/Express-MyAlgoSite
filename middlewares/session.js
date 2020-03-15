const session = require('express-session');

const setSession = (req, res, next) => {
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({
      url: process.env.MONGO_URL,
      collection: 'sessions'
    })
  });
};

module.exports = setSession;
