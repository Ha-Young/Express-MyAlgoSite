const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const db = require('./db');

const sessionConfig = {
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: db }),
};

module.exports = sessionConfig;
