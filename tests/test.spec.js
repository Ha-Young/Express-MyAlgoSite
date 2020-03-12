const request = require('supertest');
const should = require('should');

const app = require('../app');

describe('GET /login은', () => {
    describe('성공시, ', () => {
        it('200을 응답한다.', (done) => {
            request(app)
                .get('/login')
                .expect(200)
                .expect('Content-Type', /html/)
                .end((err, res) => {
                    if (err) return done(err);
                    done();
                })
        })
    })
})

describe('GET /', () => {
    describe('성공시', () => {
        it('302를 응답한다.', (done) => {
            request(app)
                .get('/')
                .expect(302)
                .end((err, res) => {
                    if (err) return done(err)
                    done()
                })
        })

    })
})
