const mongoose = require("mongoose");

const DB_URL = process.env.MONGO_URL;

async function connectToMongoDB() {
  try {
    await mongoose.connect(DB_URL, { useNewUrlParser: true });
    console.log("mongoDB connected!");
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  init: connectToMongoDB,
}
