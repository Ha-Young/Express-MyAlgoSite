const request = require('supertest');
const { expect } = require('chai');
const app = require('../app');

describe('GET /', () => {
  it('should redirect to login', done => {
    request(app)
      .get('/')
      .expect(302)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.header['location']).to.include('/login');
        done();
      });
  });
});

describe('GET /login', () => {
  it('should respond with temlpate', done => {
    request(app)
      .get('/login')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).to.include('깃헙 계정으로 로그인');
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
      .get('/javascripts/clientLogin.js')
      .expect('Content-Type', /javascript/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).to.include('/login/github');
        done();
      });
  });
});

describe('GET /non-valid-url', () => {
  it('should respond with error template', done => {
    request(app)
      .get('/non-valid-url')
      .expect('Content-Type', /html/)
      .expect(404)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).to.include('404');
        done();
      });
  });
});

describe('mongoDB database managing', function() {
  this.timeout(5000);

  const mongoose = require('mongoose');
  const db = mongoose.connection;
  const Problem = require('../models/Problem');
  const mockProblems = require('./problems.json');
  let storedProblems;

  async function storeMockProblems() {
    for (let i = 0; i < storedProblems.length; i++) {
      await new Problem(mockProblems[i]).save();
    }
  }

  async function fetchAllProblems(done) {
    await storeMockProblems();

    Problem.find().lean().exec(function(err, problems) {
      if (err) return done(err);
      storedProblems = JSON.parse(JSON.stringify(problems));
      done();
    });
  }

  function deleteAllProblems(done) {
    Problem.deleteMany({}, function(err) {
      if (err) return done(err);
      storedProblems = null;
      done();
    });
  }

  before(done => {
    (function checkDatabaseConnection() {
      if (db.readyState === 1) {
        return done();
      }

      setTimeout(checkDatabaseConnection, 1000);
    })();
  });
});
