const request = require("supertest");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { expect } = require("chai");
const sinon = require("sinon");

const app = require("../app");
const Problem = require("../models/Problem");
const User = require("../models/User");
const mockProblems = require("../models/mock_problems.json");

const SECRET_KEY = process.env.JWT_KEY;
const db = mongoose.connection;

before(done => {
  db.once("open", (err) => {
    if (err) done(err);

    done();
  });
});

describe("problem test", function() {
  this.timeout(3000);

  let storedProblems = [];

  async function setProblems(done) {
    try {
      storedProblems = await Problem.insertMany(mockProblems);

      done();
    } catch (err) {
      done(err);
    }
  }

  async function removeProblems(done) {
    try {
      const promiseList = [];

      storedProblems.forEach(problem => {
        promiseList.push(Problem.findByIdAndDelete(problem._id));
      });

      await Promise.all(promiseList);

      storedProblems.length = 0;

      done();
    } catch (err) {
      done(err);
    }
  }

  const token = jwt.sign({ user: { _id: "test" }}, SECRET_KEY);
  let requested = null;

  beforeEach(done => {
    requested = request(app).get("/problems").set("Cookie", [`loginToken=${token}`]);
    setProblems(done);
  });

  afterEach(done => {
    requested = null;
    removeProblems(done);
  });

  describe("/ GET", () => {
    it("should render problems page with set problems", (done) => {
      requested
        .expect(200)
        .expect("Content-Type", /html/)
        .end((err, res) => {
          if (err) return done(err);

          storedProblems.forEach(problem => {
            const title = problem.title;

            expect(res.text.includes(title)).true;
          });
          done();
        });
    });

    it("should render problem page by id", (done) => {
      const problemId = storedProblems[0]._id;
      const problemTitle = storedProblems[0].title;
      const monkFindOne = sinon.stub(User, "findOne").returns({ solved: [] });

      request(app)
        .get(`/problems/${problemId}`)
        .set("Cookie", [`loginToken=${token}`])
        .expect(200)
        .expect("Content-Type", /html/)
        .end((err, res) => {
          if (err) return done(err);

          expect(res.text.includes(problemTitle)).true;
          done();
        });
    });
  });
});
