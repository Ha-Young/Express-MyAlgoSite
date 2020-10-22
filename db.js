const db = require('mongoose');

db.set('useFindAndModify', false);
db.connect('mongodb://localhost/codewars', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

db.connection
  .on('error', () => console.error('connection error:'))
  .once('open', () => console.log('database connected'));

module.exports = db;
