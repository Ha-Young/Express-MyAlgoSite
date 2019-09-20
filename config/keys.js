// add this file to .gitignore

module.exports = {
  google: {
    clientID:
      '563778490290-i3fia9ngp5b75ugvndp45hmm9adlc6l1.apps.googleusercontent.com',
    clientSecret: 'PHAhBVKzAytJoXvfy_bBxus_',
  },
  mongodb: {
    dbURI:
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@vc-project-codewars-v4l7q.azure.mongodb.net/test?retryWrites=true&w=majority`,
  },
  session: {
    cookieKey: 'jaeyoungisawannabefullstackdeveloper',
  },
};
