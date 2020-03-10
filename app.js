import dotenv from 'dotenv';

dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import hpp from 'hpp';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import expressSession from 'express-session';
import connectMongo from 'connect-mongo';
import passport from 'passport';
import createError from 'http-errors';
import Github from 'passport-github';
import User from './models/User';
import homeRouter from './routes/home';
import authRouter from './routes/auth';
import problemsRouter from './routes/problems';

const app = express();
const db = mongoose.connection;
const MongoStore = connectMongo(expressSession);

mongoose.connect(process.env.MONGODB_ATLAS_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

db.once('open', () => console.log('✔️  MongoDB Connected'));
db.on('error', e => console.error('❌  MongoDB Connection Error ', e));

app.set('view engine', 'pug');
app.set('views', './views');

app.use(hpp());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.static('./public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET_KEY));
app.use(expressSession({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET_KEY,
  cookie: {
    httpOnly: true,
    secure: false,
    maxAge: 60 * 60 * 1000
  },
  store: new MongoStore({ mongooseConnection: db })
}));
app.use(passport.initialize());
app.use(passport.session());
const GithubStrategy = Github.Strategy;

passport.use(new GithubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: 'http://localhost:4000/auth/github/callback'
}, async (accessToken, refreshToken, profile, cb) => {
  const {
    _json: { id, avata_url: avatarUrl, name, email }
  } = profile;

  try {
    const user = await User.findOne({ email });
    if (user) {
      user.githubId = id;
      user.save();
      return cb(null, user);
    }

    const newUser = await User.create({
      email,
      name,
      githubId: id,
      avatarUrl
    });

    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
}));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use((req, res, next) => {
  res.locals.loggedUser = req.user || null;
  next();
});

app.use('/', homeRouter);
app.use('/auth', authRouter);
app.use('/problems', problemsRouter);

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

export default app;
