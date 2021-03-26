const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");
const { login } = require("../controllers/loginController");
const chaiHttp = require("chai-http");
const server = require("../app");

chai.should();
chai.use(chaiHttp);

describe("test login route", () => {

  it("it should send status code", () => {
    chai.request(server)
        .get("/login")
        .end((err, res) => {

          res.should.have.status(200);
        });
  });
});

describe("test home route", () => {

  it("it should send status code", () => {
    chai.request(server)
        .get("/")
        .end((err, res) => {

          res.should.have.status(200);
        });
  });
});

describe("should render page with response", function() {

  it("should render login page", () => {
    const req = {};
    const res = {
      render: sinon.spy()
    };

    login(req, res);

    expect(res.render.calledOnce).to.be.true;
  });
});
