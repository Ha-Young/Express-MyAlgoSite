const mongoose = require('mongoose');
mongoose.connect(
  process.env.ATLAS_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db =  mongoose.connection;

db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => {
  console.log("mongoose has connected to mongodb");
});
