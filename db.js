const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on("error", () => console.log("❌ Connection Failed!"));
db.once("open", () => console.log("✅ Connected!"));

module.exports = db;
