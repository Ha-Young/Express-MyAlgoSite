import dotenv from 'dotenv';

dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import hpp from 'hpp';
import helmet from 'helmet';
import morgan from 'morgan';
import expressSession from 'express-session';
import connectMongo from 'connect-mongo';
import passport from 'passport';
import createError from 'http-errors';
import passportConfig from './config/passport';
import dbConfig from './config/db';
import { setLocalsLoggedUser } from './routes/middlewares/auth';
import homeRouter from './routes/home';
import authRouter from './routes/auth';
import problemsRouter from './routes/problems';

passportConfig();
dbConfig();

const app = express();
const MongoStore = connectMongo(expressSession);

app.set('view engine', 'pug');
app.set('views', './views');

app.use(hpp());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.static('./public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(expressSession({
  resave: false,
  saveUninitialized: true,
  secret: process.env.COOKIE_SECRET_KEY,
  cookie: {
    httpOnly: true,
    secure: false,
    maxAge: 60 * 60 * 1000
  },
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(setLocalsLoggedUser);

app.use('/', homeRouter);
app.use('/auth', authRouter);
app.use('/problems', problemsRouter);

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.locals.error = err;
  res.status(err.status || 500);
  res.render('error');
});

app.listen(process.env.PORT, () => {
  console.log('✔️  Listening on port', process.env.PORT);
});
