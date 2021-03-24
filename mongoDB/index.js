const mongoose = require("mongoose");
const DB_APP_URL = process.env.DB_APP_URL.replace("<DB_PASSWORD>", process.env.DB_PASSWORD);

mongoose.connect(
  DB_APP_URL,
  { useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
);

const mongoDb = mongoose.connection;

const Problem = require("../models/Problem");
const sampleProblems= require("./sample_problems.json");

mongoDb.on("err", (err) => {
  console.warn(`db connection is failed, ${err}`);
  process.exit(1);
});

mongoDb.once("open", () => {
  console.log(`Mongodb connected, ${mongoDb.host}`);
  //storeSampleProblems();
});

const storeSampleProblems = async () => {
  for (let i = 0; i < sampleProblems.length; i++) {
    try {
      const { id, title, difficulty_level, description, tests } = sampleProblems[i];
      const newProblem = {
        problemId: id,
        title: title,
        description: description,
        level: difficulty_level,
        testcase: tests,
      }
      await Problem.create(newProblem);
    } catch (err) {
      console.warn(err);
    }
  }
};

module.exports = mongoDb;
