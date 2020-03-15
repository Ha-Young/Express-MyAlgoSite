require('dotenv').config({path: 'variables.env'});

module.exports = {
  github: {
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
  },
  session: {
    cookieKey: 'nathaneast'
  }
}
