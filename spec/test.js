const request = require('supertest');
const { expect } = require('chai');
const app = require('../app');

describe('GET /', () => {
  it('should redirect to login page when logged out', done => {
    request(app)
      .get('/')
      .expect('Content-Type', /plain/)
      .expect(302)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).to.include('/login');
        done();
      });
  });
});

describe('GET /', () => {
  it('register page', done => {
    request(app)
      .get('/register')
      .expect('Content-Type', /html/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).to.include('Register');
        done();
      });
  });
});
