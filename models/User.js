const mongoose = require("mongoose");
// mongoose.connect(
//   "mongodb+srv://minho:6M7xz4E5uB-Wuka@cluster0.ehapl.mongodb.net/test",
//   { useNewUrlParser: true, useUnifiedTopology: true },
// );

// const db = mongoose.connection;
// db.on("error", () => console.log("MongoDB Connection Error"));
// db.once("open", () => console.log("MongoDB Connected"));
/*

  TODO: Fill in the model specification

 */

const userSchema = new mongoose.Schema({
  username: String,
  googleId: String,
});

module.exports = mongoose.model("User", userSchema);
