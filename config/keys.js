// add this file to .gitignore

module.exports = {
  google: {
    clientID:
      process.env.client_ID,
    clientSecret: process.env.clientSecret,
  },
  mongodb: {
    dbURI:
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@vc-project-codewars-v4l7q.azure.mongodb.net/test?retryWrites=true&w=majority`,
  },
  session: {
    cookieKey: 'jaeyoungisawannabefullstackdeveloper',
  },
};
