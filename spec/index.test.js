const { expect } = require('chai');
const app = require('../app');
const request = require('supertest');
const Problem = require('../models/sample_problems.json');
const sinon = require('sinon');

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

describe('GET /', () => {
  beforeEach(() => {
    const stub = sinon.stub(app.request, "isAuthenticated");
    stub.returns(true);

    app.request.user = {
      username: 'true',
    };
  });

  it('should redirect to login page user excess****', done => {
    request(app)
      .get('/')
      .expect('Location', '/')
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).to.include('Codewars');
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

describe('GET /non-valid-url', () => {
  it('should respond with error template', done => {
    request(app)
      .get('/wrongsite')
      .expect('Content-Type', /html/)
      .expect(404)
      .end(done);
  });
});
