const request = require("supertest");
const jwt = require("jsonwebtoken");

const app = require("../app");

const SECRET_KEY = process.env.JWT_KEY;

describe("GET /", () => {
  it("if there is no token should redirect to login page", done => {
    request(app)
      .get("/")
      .expect(302)
      .expect("Content-Type", /plain/)
      .expect("location", "/login")
      .end((err, res) => {
        if (err) return done(err);

        done();
      });
  });

  it("if there is token should render home page", done => {
    const token = jwt.sign({ user: "test" }, SECRET_KEY);

    request(app)
      .get("/")
      .set("Cookie", [`loginToken=${token}`])
      .expect(200)
      .expect("Content-Type", /html/)
      .end((err, res) => {
        if (err) return done(err);

        done();
      });
  });
});
