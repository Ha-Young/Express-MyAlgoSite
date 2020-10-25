const request = require("supertest");
const app = require("../app");
const { expect } = require('chai');

// app.use('/test', (req, res, next) => {
//   const userCookie = req.cookies.user;

//   if (userCookie === 'testuser') {
//     res.json({ result: 'ok' });
//   } else {
//     res.json({ result: 'fail' });
//   }
// });

describe('test test', () => {
  it('/test router should return "ok", when cookie has user', (done) => {
    // app.request.cookies = {
    //   user: 'testuser'
    // };

    request(app)
      .get('/test')
      .set('Cookie', ['user=testuser'])
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        // console.log('res', res);
        if (err) return done(err);

        expect(res.body).to.eql({ result: 'ok' });
        done();
      });
  });

  it('/test router should return "fail", when there is no cookie', (done) => {

  });
});
