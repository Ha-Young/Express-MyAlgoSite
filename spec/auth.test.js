const request = require("supertest");

const app = require("../app");

describe("GET /auth", () => {
  let requested = null;

  beforeEach(() => {
    requested = request(app).get("/auth/github");
  });

  afterEach(() => {
    requested = null;
  });

  it("redirect to github auth page", done => {
    requested
      .expect("location", /https:\/\/github.com\/login\/oauth\/authorize/)
      .end((err, res) => {
        if (err) return done(err);

        done();
      });
  });
});
