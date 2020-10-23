const mongoose = require('mongoose');
mongoose.connect(
  process.env.DB,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: false,
  },(err) => console.log(err));

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
