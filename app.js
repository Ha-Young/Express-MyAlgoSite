const express = require('express');
const index = require('./routes/index');
//const bodyParser = require('body-parser');
const path = require("path");
//const passport = require('passport');
//const initializePassport = require('./passport-config');
//npm run dev;
const flash = require('express-flash');
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');
const Problem = require('./models/Problem');
const problems = require('./models/sample_problems.json');

require('dotenv').config();

const MONGOURI = process.env.MONGOURI;
const SESSION_SECRET = process.env.SESSION_SECRET;

try {
  mongoose.connect(MONGOURI, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('mongoDB connected...');
} catch (err) {
  throw new Error(err, ': mongoose connection error');
}

// saveProblemData();
// async function saveProblemData() {
//   try {
//     for (let i = 0; i < problems.length; i++) {
//       const problem = new Problem({
//         id: problems[i].id,
//         title: problems[i].title,
//         completed_users: problems[i].completed_users,
//         difficulty_level: problems[i].difficulty_level,
//         description: problems[i].description,
//         test: problems[i].tests
//       });
//       await problem.save();
//     }
//   }
//   catch(e) {
//     console.log(e);
//   }
// }

const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: false }));//클라이언트의 form값을 req.body에 넣음
// getting information from forms ->
// we want to use express.urlencoded()
// take the form, and build a access them inside 'req' inside POST method

app.use(flash());
app.use(session({//passport는 내부적으로 session을 사용하기 떄문에 기본적인 session설정을 필요합니다.
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());//passport 동작
app.use(passport.session());
// want variables to be persisted across the entire session

// passport.deserializeUser 실행
//passport.session()은 라우터로 이동할 때 마다 실행되는데,
//이때 passport.deserializeUser을 통해서 사용자 인증을 할 수 있습니다.

app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
