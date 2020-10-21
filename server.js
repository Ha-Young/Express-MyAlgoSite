const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const app = require('./app');
mongoose
  .connect('mongodb://localhost:27017/codewars', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('mongoose is on');
  });

const server = app.listen(process.env.PORT, () => {
  console.log('main server is on');
});
