require('dotenv').config();

const fs = require('fs');
const mongoose = require('mongoose');
const Problem = require('../models/Problem');

const db = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(db, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Database connection sucessful👍🏻'))
  .catch(err => console.log(err));

const problems = JSON.parse(fs.readFileSync(`${__dirname}/sample_problems.json`, 'utf-8'));

const importData = async () => {
  try {
    await Problem.create(problems);
    console.log('Data succesfully loaded!');
  } catch (err) {
    console.log(err);
  }

  process.exit();
};

const deleteData = async () => {
  try {
    await Problem.deleteMany();
    console.log('Data succesfully deleted!');
  } catch {
    console.log(err);
  }

  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
