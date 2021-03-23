require("dotenv").config({ path: "./.env"});
require("./mongoDB")
require("./passport/google_passport");

const express = require("express");
const morgan = require("morgan");
const mongoSession = require("./mongoDB/session");
const passport = require("passport");
const expressLayouts = require("express-ejs-layouts");
const bodyParser = require("body-parser");

const home = require('./routes/route_options/home');
const login = require("./routes/route_options/login");
const logout = require("./routes/route_options/logout");

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
} // === "production" ????

app.use(mongoSession);
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(expressLayouts);
app.set("layout", "./layouts/index_layout");
app.set("view engine", "ejs");
app.use(express.static("public"));

// 다 모은 라우터로 대체
app.use('/', home);
app.use("/login", login);
app.use("/logout", logout);

app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
