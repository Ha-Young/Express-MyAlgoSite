const fs = require('fs');
const mongoose = require('mongoose');
const dotev = require('dotenv');
dotev.config({ path: './config.env' });
const Problem = require('../models/Problem');

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

const problems = JSON.parse(
  fs.readFileSync(`${__dirname}/../models/sample_problems.json`, 'utf-8')
);

const importData = async () => {
  try {
    await Problem.create(problems);
    console.log('data successfully loaded');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const deleteData = async () => {
  try {
    await Problem.deleteMany();
    console.log('data successfully delete');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') importData();
else if (process.argv[2] === '--delete') deleteData();
