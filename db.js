const db = require('mongoose');

db.set('useFindAndModify', false);
db.connect('mongodb://localhost/codewars', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

db.connection
  .on('error', err => console.error(`connection error: ${err}`))
  .once('open', () => console.log('database connected'));

module.exports = db;
