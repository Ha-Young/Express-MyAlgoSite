const mongoose = require('mongoose');
const dotev = require('dotenv');
dotev.config({ path: './config.env' });
const User = require('../models/User');

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('mongoose is on');
  });

const deleteUserData = async () => {
  try {
    await User.deleteMany();
    console.log('User data successfully delete');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--deleteUser') deleteUserData();
