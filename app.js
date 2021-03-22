const express = require("express");
const mongoose = require("mongoose");

const index = require("./routes/index");
const login = require("./routes/login");

const app = express();

// dbUser / vanillacoding
// mongodb+srv://dbUser:vanillacoding@cluster0.hugiy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

mongoose.connect(
  "mongodb+srv://dbUser:vanillacoding@cluster0.hugiy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
);
const db = mongoose.connection;
db.on("error", (err) => console.error(`DB connection Error : \n${err}`));
db.once("open", () => console.log("Connected"));

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.use("/", index);
app.use("/login", login);

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
