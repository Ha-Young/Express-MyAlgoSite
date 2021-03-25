const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GithubStrategy = require("passport-github").Strategy;
const User = require("./models/User");

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.SERVICE_URL}/login/google/callback`,
  },
  async function(accessToken, refreshToken, profile, cb) {
    console.log("google auth start");
    const {
      _json: { name, email }
    } = profile;
    try {
      const user = await User.findOne({ email: email });
      console.log(user);
      if (!user) {
        console.log("google user false so setting");
        const newUser = User({
          email,
          name,
          password: "",
          isGoogle: true,
          isGithub: false,
          exprience_point: 0,
          kyu: 8,
          problems: []
        });
        await User.create(newUser);
        return cb(null, newUser);
      }

      if (email === user.email && user.isGoogle) {
        console.log("google user true");
        return cb(null, user);
      }
    } catch (err) {
      console.log(err);
      cb(err);
    }
  }
));

passport.use(new GithubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: `${process.env.SERVICE_URL}/login/github/callback`
  },
  async (accessToken, refreshToken, profile, cb) => {
    const { _json: { id, avatar_url, name, email} } = profile;
    console.log("github auth come");
    console.log(profile._json);
    try{
        const user = await User.findOne({email});
        if (user) {
            return cb(null, user);
        }else{
            const newUser = await User.create({
                name,
                email,
                githubId: id,
                avatarUrl: avatar_url,
            });
            return cb(null, newUser);
        }
    }catch(error){
        return cb(error);
    }
}));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));
