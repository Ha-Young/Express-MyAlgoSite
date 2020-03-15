const mongoose = require('mongoose');

const onMongoose = (req, res, next) => {
  mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  });
  next();
};

module.exports = onMongoose;
