const superagent = require('superagent');
const agent = superagent.agent();
const account = {
  'name': 'nacho',
  'password': 'cheese'
};

exports.login = (request, done) => {
  request
    .post('/login')
    .send(account)
    .end((err, res) => {
      if (err) {
        throw err;
      }
      agent.saveCookies(res);
      done(agent);
    });
};
