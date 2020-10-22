const mongoose = require('mongoose');
mongoose.connect(
  'mongodb://localhost/codewars',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: false,
  });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('connected');
});
