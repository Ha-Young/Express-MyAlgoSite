const request = require('supertest');
const { expect } = require('chai');
const app = require('../app');

describe('GET /', () => {
  it('should redirect to login if user is not logined', done => {
    request(app)
      .get('/')
      .expect('Content-Type', /plain/)
      .expect(302)
      .expect('Location', 'login')
      .end(done);
  });
});

describe('GET /login', () => {
  it('shold respond with login template', done => {
    request(app)
      .get('/login')
      .expect('Content-Type', /html/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).to.include('Login with Github');
        done();
      });
  });
});
