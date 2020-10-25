const request = require('supertest');
const app = require('../app');

it('should render login page', (done) => {
  request(app)
    .get('/login')
    .expect(200)
    .expect('Content-Type', /html/)
    .end((err, result) => {
      if (err) return done(err);

      done();
    });
});

it('should redirect login page if user has no session', (done) => {
  request(app)
    .get('/')
    .expect(302)
    .expect('location', '/login')
    .end((err, res) => {
      if (err) return done(err);

      done();
    });
});

it('should redirect problems page if user has session', (done) => {
  app.request.session = {
    passport: true
  };

  request(app)
    .get('/')
    .expect(302)
    .expect('location', '/problems')
    .end((err, res) => {
      if (err) return done(err);

      app.request.session = undefined;
      done();
    });
});
