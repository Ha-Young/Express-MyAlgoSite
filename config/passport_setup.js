// const express = require('express');
// const app = express();
// const passport = require('passport');
// const GitHubStrategy = require('passport-github').Strategy;
// const keys = require('./keys');
// const User = require('../models/User');

// passport.serializeUser( (usr,cb)=>{
//   cb(null,user);
// })
// passport.deserializeUser( (usr,cb)=>{
//   cb(null,user);
// })

// passport.use(
// 	new GitHubStrategy(
// 		{
// 			clientID: keys.github.CLIENT_ID,
// 			clientSecret: keys.github.CLIENT_SECRET,
// 			callbackURL: 'http://localhost:3000/login/github/callback'
// 		},
// 		(accessToken, refreshToken, profile, cb) => {
// 			console.log(accessToken, refreshToken, profile, cb);
// 			//passport callback
// 			// User.find({ githubId: profile.id }, (err, user) => {
// 			// 	console.log(user);
// 			 	return cb(err, profile);
// 			// });
// 		}
// 	)
// );
