const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", () => console.log("MongoDB Connection Error"));
db.once("open", () => console.log("MongoDB Connected"));

module.exports = db;
