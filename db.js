const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.ATLAS, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.set('useCreateIndex', true);

const db = mongoose.connection;

const Problem = require("./models/Problem");
const mockProblem = require("./models/sample_problems.json");

if (process.env.NODE_ENV === "development") {
  const mock = async () => {
    for (let i = 0; i < mockProblem.length; i++) {
      const isExist = await Problem.exists({ id: mockProblem[i].id });

      if (!isExist) {
        await Problem.create(mockProblem[i]);
      }
    }
  };
  mock();
  console.log("✅ Success load problems");
}

db.on("error", () => console.log("❌ Connection Failed!"));
db.once("open", () => console.log(`✅ Connected to: http://localhost:${process.env.PORT}`));

module.exports = db;
