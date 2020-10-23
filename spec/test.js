const { expect } = require('chai');
const request = require('supertest');
const app = require('../app');

describe('GET /login', () => {
  it('should redirect to login page', (done) => {
    request(app)
      .get('/')
      .expect('Content-Type', 'text/plain; charset=utf-8')
      .expect(302)
      .expect('Location', '/login')
      .end(done);
  });
});

describe('GET /', () => {
  it('should repsond with template', (done) => {
    request(app)
      .get('/login')
      .expect('Content-Type', /html/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).to.include('LOGIN');
        done();
      });
  });
});

describe('GET /non-valid-url', () => {
  it('should respond with error template', (done) => {
    const urlNotExisted = 'zxcbdskcenwkk3j2';

    request(app)
      .get(`/${urlNotExisted}`)
      .expect('Content-Type', /html/)
      .expect(404)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).to.include('404');
        done();
      });
  });
});

