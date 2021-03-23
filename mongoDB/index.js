const mongoose = require("mongoose");
const DB_APP_URL = process.env.DB_APP_URL.replace("<DB_PASSWORD>", process.env.DB_PASSWORD);

mongoose.connect(
  DB_APP_URL,
  { useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
);

const mongoDb = mongoose.connection;

mongoDb.on("err", (err) => {
  console.warn(`db connection is failed, ${err}`);
  process.exit(1);
});

mongoDb.once("open", () => console.log(`Mongodb connected, ${mongoDb.host}`));

module.exports = mongoDb;
