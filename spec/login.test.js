const request = require("supertest");
const app = require("../app");

describe("GET /login", () => {
  it("should render login page", done => {
    request(app)
      .get("/login")
      .expect(200)
      .expect("Content-Type", /html/)
      .end((err, res) => {
        if (err) return done(err);

        done();
      });
  });
});
