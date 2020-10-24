const mongoose = require("mongoose");

const uri = `mongodb+srv://${process.env.MONGODB_ID}:${process.env.MONGODB_PASSWORD}@cluster0.w0p1f.gcp.mongodb.net/vaco?retryWrites=true&w=majority`;

mongoose.connect(uri, {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
}, (err) => {
  if (err) throw Error(err);
});

const connection = mongoose.connection;

module.exports = connection;
