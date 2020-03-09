const mongoose = require('mongoose');
const db = mongoose.connection;

mongoose.connect('mongodb://localhost/codewars', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('DB is connected!');
});
