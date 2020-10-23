/* eslint-disable no-undef */
const { expect } = require('chai');
const request = require('supertest');
const randomstring = require("randomstring");
const app = require('../app');

describe('GET /login', () => {
  it('should respond with template', done => {
    request(app)
      .get('/')
      .expect('Content-Type', /plain/)
      .expect(302)
      .expect("Location", "/login")
      .end(done);
  });
});

describe("GET /non-valid-url", () => {
  it("should respond with error template", (done) => {
    const randomString = randomstring.generate();

    request(app)
      .get(`/${randomString}`)
      .expect("Content-Type", /html/)
      .expect(404)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).to.include("404");
        done();
      });
  });
});