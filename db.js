const mongoose = require("mongoose");

const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

mongoose.set("useCreateIndex", true);
mongoose.connect(
  DB,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
);

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
  console.log("Success");
}

const db = mongoose.connection;

db.on("error", () => console.log("❌ DB connection fail!"));
db.once("open", () => console.log(`✅ DB connected to : http://localhost:${process.env.PORT}`));

module.exports = db;
