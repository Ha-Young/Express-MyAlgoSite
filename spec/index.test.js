const { expect } = require('chai');
const app = require('../app');
const request = require('supertest');
const Problem = require('../models/sample_problems.json');

describe('GET /', () => {
  it('should redirect to login page when unauthorized user excess', done => {
    request(app)
      .get('/')
      .expect('Location', '/login')
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).to.include('Found. Redirecting to /login');
        done();
      });
  });
});

describe('GET /login', () => {
  it('should respond with login template', done => {
    request(app)
      .get('/login')
      .expect('Content-Type', /html/)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).to.include('Codewars');
        done();
      });
  });
});

// username 어떻게 보내지
describe('GET /non-valid-url', () => {
  it('should respond with error template', done => {
    request(app)
      .get('/wrongsite')
      .expect('Content-Type', /html/)
      .expect(404)
      .end(done);
  });
});

describe('GET /:problem_id', () => {
  it('should respond with problem template', done => {
    const problemId = Problem[0].id;
    request(app)
      .get(`/problems/${problemId}}`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).to.include('피보나치 수열');
        done();
      });
  });
});