const mongoose = require('mongoose');

const onMongoose = (req, res, next) => {
  mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });
  next();
};

module.exports = onMongoose;
