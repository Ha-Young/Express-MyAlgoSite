const request = require('supertest');
const app = require('../app');
const { expect } = require('chai')

describe('GET /', () => {
  it('should respond with template', done => {
    request(app)
      .get('/')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).to.include('로그인을 하세요');
        done();
      });
  });
});

describe('GET static assets', () => {
  it('should be able to get static css file', done => {
    request(app)
      .get('/stylesheets/style.css')
      .expect('Content-Type', /css/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).to.include('Lucida Grande');
        done();
      });
  });

  it('should be able to get static js file', done => {
    request(app)
      .get('/javascripts/index.js')
      .expect('Content-Type', /javascript/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).to.include('javascript');
        done();
      });
  });
});
