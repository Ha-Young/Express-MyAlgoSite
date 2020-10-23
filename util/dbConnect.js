const mongoose = require('mongoose');

const dbConnect = () => {
  if (process.env.NODE_ENV !== 'production') {
    mongoose.set('debug', true);
  }
  mongoose.connect(`mongodb+srv://jpdud:wkdwns007557523m!@@cluster0.rwebj.mongodb.net/codewar?retryWrites=true&w=majority`, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }, (error) => {
    if (error) {
      console.log('몽고디비 연결 에러');
    } else {
      console.log('몽고디비 연결 성공');
    }
  });
};
mongoose.connection.on('error', (error) => {
  console.error('몽고디비 에러 ', error);
});
mongoose.connection.on('disconnected', () => {
  console.error('몽고디비 연결이 끊겼습니다. 재시작합니다.');
  connect();
});

module.exports = dbConnect;
