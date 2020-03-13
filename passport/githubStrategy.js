const GithubStrategy = require('passport-github').Strategy;

const User = require('../models/User');

module.exports = (passport) => {

    passport.use(new GithubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.GITHUB_CALLBACKURL
    }, async (accessToken, refreshToken, profile, cb) => {
        try {
            const user = await User.findOne({ id: profile.id });
            if (user) {
                cb(null, user);
            } else {
                const newUser = await new User({
                    id: profile.id,
                    username: profile.username,
                    profileUrl: profile.profileUrl,
                    provider: profile.provider
                }).save();
                cb(null, newUser);
            }
        } catch (err) {
            console.log(err);
            cb(err);
        }
    }));  
}
