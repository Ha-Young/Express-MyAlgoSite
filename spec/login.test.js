const request = require('supertest');
const { expect } = require('chai');
const app = require('../app');

describe('GET /login', () => {
  it('should respond with login template' , done => {
    request(app)
      .get('/login')
      .expect('Content-Type', /html/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).to.include('GitHub Log In');
        done();
      })
  });
});
