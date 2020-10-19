const mongoose = require('mongoose');

mongoose.connect(process.env.DB_LOCAL_ADDRESS, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

const db = mongoose.connection;

db.once('open', function () {
  console.log('DB is connected');
});

db.on('error', function (err) {
  console.error(err);
});
