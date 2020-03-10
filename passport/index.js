const github = require('./githubStrategy');
const User = require('../models/User');


module.exports = (passport) => {
    passport.serializeUser(function (user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function (id, done) {
        User.findOne({ _id: id })
            .then(user=> done(null, user))
            .catch(err=>done(err));
    });

    github(passport);
}
