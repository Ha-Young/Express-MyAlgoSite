const request = require('supertest');
const { expect } = require('chai');
const app = require('../app');

describe('GET / without user', () => {
  it('should redirect to login page without user', done => {
    request(app)
      .get('/')
      .expect('Content-Type', /plain/)
      .expect(302)
      .expect('Location', '/login')
      .end(done);
  });
});

describe('404', () => {
  it('404', done => {
    request(app)
      .get('/invalidUrl')
      .expect('Content-Type', /html/)
      .expect(404)
      .end(done);
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
        expect(res.text).to.include('Fira Code');
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
        expect(res.text).to.include("console.log('hello world!');");
        done();
      });
  });
});
