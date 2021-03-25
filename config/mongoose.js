const mongoose = require("mongoose");
const db = mongoose.connection;

function mongooseConfig() {
  mongoose.connect(
    "mongodb://127.0.0.1:27017",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }
  );

  db.on("error", console.error);

  db.once("open", () => {
    console.log("Successfully connected to mongdb");
  });
}

module.exports = mongooseConfig;
