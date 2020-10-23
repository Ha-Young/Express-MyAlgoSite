const request = require("supertest");
const jwt = require("jsonwebtoken");
const sinon = require("sinon");

const app = require("../app");

const SECRET_KEY = process.env.JWT_KEY;
const token = jwt.sign({ user: "test" }, SECRET_KEY);

let clearCookie;
let requested;

beforeEach(() => {
  requested = request(app).get("/logout");
  clearCookie = sinon.spy(app.response, "clearCookie");
});

afterEach(() => {
  requested = null;
  clearCookie.restore();
});

describe("/logout", () => {
  it("should redirect to login page if there is token", done => {
    requested
      .expect(302)
      .expect("location", "/login")
      .end((err, res) => {
        if (err) return done(err);

        done();
      });
  });

  it("should redirect to login page if there is not token", done => {
    requested
      .set("Cookie", [`loginToken=${token}`])
      .expect(302)
      .expect("location", "/login")
      .end((err, res) => {
        if (err) return done(err);

        done();
      });
  });

  it("should remove loginToken if there is token", done => {
    requested
      .set("Cookie", [`loginToken=${token}`])
      .expect(302)
      .expect("Content-type", /plain/)
      .end((err, res) => {
        if (err) return done(err);

        sinon.assert.calledOnce(clearCookie);
        done();
      });
  });
});
