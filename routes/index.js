const express = require('express');
const router = express.Router();
// const axios = require('axios');
// const https = require('https');
// const querystring = require('querystring');

// const state = require('../app').state;

// const CLIENT_ID = process.env.CLIENT_ID;
// const CLIENT_SECRET = process.env.CLIENT_SECRET;

/* GET home page. */
router.get('/', (req, res, next) => {
  console.log(req.user);
  res.render('index', { title: '바닐라코딩' });

  // if (req.query.state !== state) {
  //   // abort the log in
  //   res.redirect('/login');
  //   // return res.status(403).end("Github Login Failure");
  // }

  // async function verifyCode(clientId, clientSecret, code) {
  //   const url = `https://github.com/login/oauth/access_token/?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${code}`
  //   const response = await axios.post(url);
  //   const decoded = querystring.decode(response.data);
  //   return decoded.access_token;
  // }

  // async function getUser(accessToken) {
  //   const instance = axios.create({
  //     baseURL: 'https://api.github.com/user',
  //     headers: {'Authorization': `token ${accessToken}`}
  //   });
  //   const res = await instance.get();
  //   return res.data;

  //   // const url = 'https://api.github.com/user'
  //   // const options = {
  //   //   headers: {
  //   //     'Authorization': `token ${accessToken}`
  //   //   }
  //   // }
  //   // // console.log(options);
  //   // const res = await https.get(url, options);
  //   // console.log(res);
  //   // return res.data;
  // }

  // const accessToken = await verifyCode(CLIENT_ID, CLIENT_SECRET, req.query.code);
  // const user = await getUser(accessToken);
  // // console.log(user);


  // get user detail

});

module.exports = router;
