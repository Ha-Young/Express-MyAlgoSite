const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const app = require('./app');
const AppError = require('./utils/appError');

mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('err', (err) => {
  throw new AppError(err.message, 500);
});

const port = process.env.PORT || 3000;
app.listen(port);
