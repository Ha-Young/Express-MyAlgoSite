const request = require('supertest');
const { expect } = require('chai');
const should = require('should');

const app = require('../app');

describe('GET /login', () => {
    describe('success ', () => {
        it('Should respond 200', (done) => {
            request(app)
                .get('/login')
                .expect(200)
                .expect('Content-Type', /html/)
                .end((err, res) => {
                    if (err) return done(err);
                    done();
                });
        });
    });
    describe('failure', () => {
        it('If it comes in with an invalid URL, you should respond with 404', (done) => {
            request(app)
                .get('/1234')
                .expect(404)
                .expect('Content-Type', /html/)
                .end((err, res) => {
                    if (err) return done(err);
                    done();
                });
        });
    });
});

describe('GET /', () => {
    describe('success', () => {
        it('Should respond 302', (done) => {
            request(app)
                .get('/')
                .expect(302)
                .end((err, res) => {
                    if (err) return done(err)
                    done()
                });
        });
    });
});

describe('GET /problems/:problem_id', () => {
    describe('success', () => {
        it('Should respond 302', (done) => {
            request(app)
                .get('/problems/1')
                .expect(302)
                .end((err, res) => {
                    if (err) done(err)
                    done()
                });
        });
    });
});

describe('POST /problems/:problem_id', () => {
    describe('success', () => {
        it('Should respond 302', (done) => {
            request(app)
                .get('/problems/1')
                .expect(302)
                .end((err, res) => {
                    if (err) done(err)
                    done()
                });
        });
    });
});
