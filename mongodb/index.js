const mongoose = require("mongoose");

const { MongoError } = require("../service/error");

const uri = `mongodb+srv://${process.env.MONGODB_ID}:${process.env.MONGODB_PASSWORD}@cluster0.w0p1f.gcp.mongodb.net/vaco?retryWrites=true&w=majority`;

mongoose.connect(uri, {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
}, (err) => {
  if (err) throw new MongoError(err);
});

mongoose.connection.on("error", (err) => {
  if (err) throw new MongoError(err);
});

mongoose.connection.once("open", (err) => {
  if (err) throw new MongoError(err);

  console.log("mongodb is connected...");
});

module.exports = mongoose;
