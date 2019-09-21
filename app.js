const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
var logger = require("morgan");
var bodyParser = require("body-parser");
var session = require("express-session");
var FileStore = require("session-file-store")(session);
var falsh = require("connect-flash");
require("dotenv").config();

mongoose.connect(process.env.MONGODB_CONNECT, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("we're connected!");
});

const app = express();
app.use(logger("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    store: new FileStore()
  })
);
app.use(falsh());

var passport = require("./passport")(app);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const index = require("./routes/index");
const login = require("./routes/login")(passport);
const logout = require("./routes/logout");
const register = require("./routes/register");
const problems = require("./routes/problems");

app.use("/", index);
app.use("/login", login);
app.use("/logout", logout);
app.use("/register", register);
app.use("/problems", problems);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
