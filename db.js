const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_DB_URL, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
  dbName: "express",
});

const db = mongoose.connection;

const Problem = require("./models/Problem");
const mockProblem = require("./models/sample_problems.json");

// if (process.env.NODE_ENV === "development") {
//   const mock = async () => {
//     for (let i = 0; i < mockProblem.length; i++) {
//       await Problem.create(mockProblem[i]);
//     }
//   };
//   mock();
//   console.log("Success");
// }

db.on("error", (error) => {
  console.error("db connection error", error);
});

db.once("open", () => {
  console.log("Connected!");
});

module.exports = db;
