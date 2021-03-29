const User = require("../../models/User");

exports.store = async function (req, res, next) {
  new User({
    userId: {
      google: req.user.id,
    },
    name: req.user.displayName,
    photos: req.user._json.picture,
    locale: req.user._json.locale
  }).save();

  next();
};
