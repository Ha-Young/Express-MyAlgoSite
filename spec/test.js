/* eslint-disable no-undef */
const request = require('supertest');
const { expect } = require('chai');
const app = require('../app');

describe('GET /', () => {
  it('should respond with template', done => {
    request(app)
      .get('/')
      .expect('Content-Type', /html/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).to.include('Codewars');
        done();
      });
  });
});

// describe("GET static assets", () => {
//   it("should be able to get static css file", (done) => {
//     request(app)
//       .get("/stylesheets/style.css")
//       .expect("Content-Type", /css/)
//       .expect(200)
//       .end((err, res) => {
//         if (err) return done(err);
//         expect(res.text).to.include("Lucida Grande");
//         done();
//       });
//   });

//   it("should be able to get static js file", (done) => {
//     request(app)
//       .get("/javascripts/client.js")
//       .expect("Content-Type", /javascript/)
//       .expect(200)
//       .end((err, res) => {
//         if (err) return done(err);
//         expect(res.text).to.include("alert(123);");
//         done();
//       });
//   });
// });

// /*

// 3. Handling POST request

// */
// describe("POST /", () => {
//   it("should respond with success template", (done) => {
//     const randomString = randomstring.generate();

//     request(app)
//       .post("/")
//       .send({ title: randomString })
//       .expect("Content-Type", /html/)
//       .expect(201)
//       .end((err, res) => {
//         if (err) return done(err);
//         expect(res.text).to.include("Success");
//         expect(res.text).to.include(randomString);
//         done();
//       });
//   });
// });

// /*

// 4. Redirect

// */
// describe("GET /google", () => {
//   it("should redirect to google", (done) => {
//     request(app)
//       .get("/google")
//       .expect("Content-Type", /plain/)
//       .expect(302)
//       .expect("Location", "http://www.google.com")
//       .end(done);
//   });
// });

// /*

// 5. Accessing an invalid url

// - Error Handling in Express
// - https://expressjs.com/ko/guide/error-handling.html

// */
// describe("GET /non-valid-url", () => {
//   it("should respond with error template", (done) => {
//     const randomString = randomstring.generate();

//     request(app)
//       .get(`/${randomString}`)
//       .expect("Content-Type", /html/)
//       .expect(404)
//       .end((err, res) => {
//         if (err) return done(err);
//         expect(res.text).to.include("404");
//         done();
//       });
//   });
// });

// /*

// 6. Reading an user

// - Serving JSON

// */
// describe("GET /users", () => {
//   it("should respond with users list json", (done) => {
//     request(app)
//       .get("/users")
//       .expect("Content-Type", /json/)
//       .expect(200)
//       .end((err, res) => {
//         if (err) return done(err);
//         expect(res.body).to.eql(USERS);
//         done();
//       });
//   });
// });

// /*

// 7. Creating an user

// - Serving JSON

// */
// describe("POST /users", () => {
//   it("should add new user", (done) => {
//     request(app)
//       .post("/users")
//       .send({ id: 4, name: "test" })
//       .expect("Content-Type", /json/)
//       .expect(201)
//       .end((err, res) => {
//         if (err) return done(err);
//         expect(USERS.length).to.eql(4);
//         expect(res.body).to.eql(USERS);
//         done();
//       });
//   });
// });

// /*

// 8. Updating an user

// - Serving JSON
// - Response Status

// */
// describe("PUT /users/:user_id", () => {
//   it("should update existing user", (done) => {
//     request(app)
//       .put("/users/4")
//       .send({ name: "sample" })
//       .expect("Content-Type", /json/)
//       .expect(200)
//       .end((err, res) => {
//         if (err) return done(err);
//         expect(USERS[3]).to.eql({ id: 4, name: "sample" });
//         expect(res.body).to.eql({ id: 4, name: "sample" });
//         done();
//       });
//   });

//   it("should respond with 400 for non-existing user", (done) => {
//     const originalUsers = JSON.parse(JSON.stringify(USERS));

//     request(app)
//       .put("/users/78")
//       .send({ name: "unbelievable" })
//       .expect("Content-Type", /json/)
//       .expect(400)
//       .end((err, res) => {
//         if (err) return done(err);
//         expect(USERS).to.eql(originalUsers);
//         expect(res.body).to.eql({ error: "invalid user" });
//         done();
//       });
//   });
// });

// /*

// 9. Deleting an user

// - Serving JSON

// */
// describe("DELETE /user/:user_id", () => {
//   it("should delete user", (done) => {
//     request(app)
//       .delete("/users/1")
//       .expect("Content-Type", /json/)
//       .expect(200)
//       .end((err, res) => {
//         if (err) return done(err);
//         expect(USERS.length).to.eql(3);
//         expect(res.body).to.eql({ result: "ok" });
//         done();
//       });
//   });

//   it("should respond with 400 for non-existing user", (done) => {
//     const originalUsers = JSON.parse(JSON.stringify(USERS));

//     request(app)
//       .delete("/users/38")
//       .expect("Content-Type", /json/)
//       .expect(400)
//       .end((err, res) => {
//         if (err) return done(err);
//         expect(USERS).to.eql(originalUsers);
//         expect(res.body).to.eql({ error: "invalid user" });
//         done();
//       });
//   });
// });

// /*

// 10. Generating a token

// - Working with middlewares
// - JWT (jsonwebtoken)

// */
// describe("GET /user/:user_id/token", () => {
//   it("should not generate token to invalid user", (done) => {
//     request(app)
//       .get("/users/332/token")
//       .expect("Content-Type", /json/)
//       .expect(400)
//       .end((err, res) => {
//         if (err) return done(err);
//         expect(res.body).to.eql({ error: "invalid user" });
//         done();
//       });
//   });

//   it("should generate token to valid user", (done) => {
//     const targetUserId = USERS[0].id;
//     const user = USERS.filter((u) => u.id === targetUserId)[0];

//     request(app)
//       .get(`/users/${targetUserId}/token`)
//       .expect("Content-Type", /json/)
//       .expect(200)
//       .end((err, res) => {
//         if (err) return done(err);
//         expect(res.body).to.eql({
//           result: "ok",
//           token: jwt.sign(user, YOUR_SECRET_KEY),
//         });
//         done();
//       });
//   });
// });

// /*

// 11. Validating token

// - Basic Security

// */
// describe("GET /user/:user_id/secret", () => {
//   it("should not allow invalid token", (done) => {
//     const userId = USERS[0].id;

//     request(app)
//       .get(`/users/${userId}/secret`)
//       .set("VC-CLIENT-TOKEN", "invalid-token-random")
//       .expect("Content-Type", /json/)
//       .expect(401)
//       .end((err, res) => {
//         if (err) return done(err);
//         expect(res.body).to.eql({ error: "unauthorized" });
//         done();
//       });
//   });

//   it("should allow valid client id", (done) => {
//     const userId = USERS[0].id;

//     request(app)
//       .get(`/users/${userId}/token`)
//       .end((err, res) => {
//         if (err) return done(err);

//         request(app)
//           .get(`/users/${userId}/secret`)
//           .set("VC-CLIENT-TOKEN", res.body.token)
//           .expect("Content-Type", /json/)
//           .expect(200)
//           .end((err, res) => {
//             if (err) return done(err);
//             expect(res.body).to.eql({
//               result: "ok",
//               secret: "i am secret something",
//             });
//             done();
//           });
//       });
//   });
// });

// /*

// 12. Working with real database

// README.md를 참고하여 아래 세 가지를 반드시 완료한 후, 다음 테스트를 진행하세요.

// - install MongoDB
// - run MongoDB locally
// - connect to MongoDB from express using `mongoose`

// 추가적으로 MongoDB Shell 또한 사용해보고 진행하시면 더 좋습니다.
// https://docs.mongodb.com/manual/mongo/#working-with-the-mongo-shell

// 위 단계를 완료한 후, MongoDB 서버를 실행한 상태에서 아래 테스트를 실행시키셔야 합니다.

// */
// describe("With mongoDB database", function () {
//   // Quiz: why not an arrow function?
//   this.timeout(10000);

//   const mongoose = require("mongoose");
//   const db = mongoose.connection;
//   const Article = require("../models/Article");
//   const mockArticles = require("./articles.json");
//   let storedArticles;

//   const storeMockArticles = async () => {
//     for (let i = 0; i < mockArticles.length; i++) {
//       await new Article(mockArticles[i]).save();
//     }
//   };

//   const fetchAllArticles = (done) => {
//     storeMockArticles().then(() => {
//       Article.find()
//         .lean()
//         .exec(function (err, articles) {
//           if (err) return done(err);
//           storedArticles = JSON.parse(JSON.stringify(articles));
//           done();
//         });
//     });
//   };

//   const deleteAllArticles = (done) => {
//     Article.deleteMany({}, function (err) {
//       if (err) return done(err);
//       storedArticles = null;
//       done();
//     });
//   };

//   before((done) => {
//     // wait for database to be connected
//     (function checkDatabaseConnection() {
//       if (db.readyState === 1) {
//         return done();
//       }

//       setTimeout(checkDatabaseConnection, 1000);
//     })();
//   });

//   /*

//   12-1. [MongoDB] Reading an article

//   */
//   describe("GET /articles", () => {
//     beforeEach(fetchAllArticles);
//     afterEach(deleteAllArticles);

//     it("should get all articles from the database and return in response", (done) => {
//       request(app)
//         .get("/articles")
//         .expect(200)
//         .end((err, res) => {
//           if (err) return done(err);

//           const articles = res.body.articles;

//           expect(articles).to.exist;
//           expect(Array.isArray(articles)).to.be.true;

//           expect(articles.length).to.eql(storedArticles.length);
//           expect(articles).to.eql(storedArticles);

//           done();
//         });
//     });
//   });

//   /*

//   12-2. [MongoDB] Creating an article

//   */
//   describe("POST /articles/new", () => {
//     beforeEach(fetchAllArticles);
//     afterEach(deleteAllArticles);

//     const newArticle = {
//       source: {
//         id: null,
//         name: "news.ycombinator.com",
//       },
//       author: "Douglas Crockford",
//       title: "WebKit Tracking Prevention Policy",
//       description:
//         "A first party is a website that a user is intentionally and knowingly visiting, as displayed by the URL field of the browser, and the set of resources on the web operated by the same organization. In practice, we consider resources to belong to the same party if they are part of the same registrable domain: a public suffix plus one additional label. Example: site.example, www.site.example, and s.u.b.site.example are all the same party since site.example is their shared registrable domain. A third party is any party that does not fall within the definition of first party above. This policy doesn't distinguish between companies that own multiple top level domains. I understand that it may be technically hard to figure out but at the policy level are two domains owned by one company really third party to each other? Are example.com and example.us really always different first parties? What about apple.com and iCloud.com ? Or those redirect chains that happen after logging into google such that login cookies are set on youtube.com and whatnot?",
//       url: "https://news.ycombinator.com/item?id=20700914",
//       urlToImage: "",
//       publishedAt: new Date(),
//       content:
//         "We're willing to do specifically targeted mitigations, but only if we have to.So far, nearly everything we've done has been universal or algorithmic. The one exception I know of was to delete tracking data that had already been planted by known circumventers, at the same time as the mitigation to stop anyone else from using that particular hole (HTTPS super cookies).",
//     };

//     it("should add a new article into the database", (done) => {
//       const userId = USERS[0].id;

//       request(app)
//         .get(`/users/${userId}/token`)
//         .end((err, res) => {
//           if (err) return done(err);

//           request(app)
//             .post("/articles/new")
//             .set("VC-CLIENT-TOKEN", res.body.token)
//             .send(newArticle)
//             .expect(201)
//             .end(async (err, res) => {
//               if (err) return done(err);

//               expect(res.body.result).to.exist;
//               expect(res.body.result).to.eql("ok");

//               const article = res.body.article;

//               expect(res.body.article).to.exist;
//               expect(res.body.article._id).to.exist;
//               expect(mongoose.Types.ObjectId.isValid(article._id)).to.be.true;

//               const allArticles = await Article.find();
//               const addedArticle = await Article.findOne({
//                 author: "Douglas Crockford",
//               });

//               expect(allArticles.length).to.eql(storedArticles.length + 1);
//               expect(addedArticle).to.exist;

//               done();
//             });
//         });
//     });

//     // TIP: Look at `routes/articles.js` and `routes/middlewares/authorization.js`
//     it("should NOT add a new article with invalid token", (done) => {
//       request(app)
//         .post("/articles/new")
//         .set("VC-CLIENT-TOKEN", "falsyToken-hello,world")
//         .send(newArticle)
//         .expect(401)
//         .end(async (err, res) => {
//           if (err) return done(err);

//           expect(res.body.result).to.not.exist;
//           expect(res.body.error).to.exist;
//           expect(res.body.error).to.eql("unauthorized");

//           const allArticles = await Article.find();
//           const addedArticle = await Article.findOne({
//             author: "Douglas Crockford",
//           });

//           expect(allArticles.length).to.eql(storedArticles.length);
//           expect(addedArticle).to.not.exist;

//           done();
//         });
//     });

//     it("should NOT add a new article with invalid token", (done) => {
//       request(app)
//         .post("/articles/new")
//         .send(newArticle)
//         .expect(401)
//         .end(async (err, res) => {
//           if (err) return done(err);

//           expect(res.body.result).to.not.exist;
//           expect(res.body.error).to.exist;
//           expect(res.body.error).to.eql("unauthorized");

//           const allArticles = await Article.find();
//           const addedArticle = await Article.findOne({
//             author: "Douglas Crockford",
//           });

//           expect(allArticles.length).to.eql(storedArticles.length);
//           expect(addedArticle).to.not.exist;

//           done();
//         });
//     });
//   });

//   /*

//   12-3. [MongoDB] Updating an article

//   */
//   describe("PUT /articles/:article_id", () => {
//     beforeEach(fetchAllArticles);
//     afterEach(deleteAllArticles);

//     it("should update existing article", (done) => {
//       const userId = USERS[0].id;
//       const articleId = storedArticles[0]._id;

//       request(app)
//         .get(`/users/${userId}/token`)
//         .end((err, res) => {
//           if (err) return done(err);

//           request(app)
//             .put(`/articles/${articleId}`)
//             .set("VC-CLIENT-TOKEN", res.body.token)
//             .send({
//               title: "Hello World",
//             })
//             .expect(200)
//             .end(async (err, res) => {
//               if (err) return done(err);

//               expect(res.body.result).to.exist;
//               expect(res.body.result).to.eql("ok");

//               const article = res.body.article;

//               expect(res.body.article).to.exist;
//               expect(res.body.article._id).to.exist;
//               expect(mongoose.Types.ObjectId.isValid(article._id)).to.be.true;

//               const allArticles = await Article.find();
//               const updatedArticle = await Article.findOne({
//                 title: "Hello World",
//               });

//               expect(allArticles.length).to.eql(storedArticles.length);
//               expect(updatedArticle).to.exist;

//               done();
//             });
//         });
//     });

//     it("should respond with error if invalid id is given", (done) => {
//       const userId = USERS[0].id;
//       const articleId = "invalid-article-id";

//       request(app)
//         .get(`/users/${userId}/token`)
//         .end((err, res) => {
//           if (err) return done(err);

//           request(app)
//             .put(`/articles/${articleId}`)
//             .set("VC-CLIENT-TOKEN", res.body.token)
//             .send({
//               title: "Hello World",
//             })
//             .expect(400)
//             .end(async (err, res) => {
//               if (err) return done(err);

//               expect(res.body.result).to.not.exist;
//               expect(res.body.error).to.exist;
//               expect(res.body.error).to.eql("invalid article id");

//               expect(res.body.article).to.not.exist;

//               done();
//             });
//         });
//     });

//     it("should NOT update article with invalid token", (done) => {
//       const articleId = storedArticles[0]._id;

//       request(app)
//         .put(`/articles/${articleId}`)
//         .set("VC-CLIENT-TOKEN", "whatareyoudoing,faketoken")
//         .send({
//           title: "Hello World",
//         })
//         .expect(401)
//         .end(async (err, res) => {
//           if (err) return done(err);

//           expect(res.body.result).to.not.exist;
//           expect(res.body.error).to.exist;
//           expect(res.body.error).to.eql("unauthorized");

//           const allArticles = await Article.find();
//           const updatedArticle = await Article.findOne({
//             title: "Hello World",
//           });

//           expect(allArticles.length).to.eql(storedArticles.length);
//           expect(updatedArticle).to.not.exist;

//           done();
//         });
//     });

//     it("should NOT update article without token", (done) => {
//       const articleId = storedArticles[0]._id;

//       request(app)
//         .put(`/articles/${articleId}`)
//         .send({
//           title: "Hello World",
//         })
//         .expect(401)
//         .end(async (err, res) => {
//           if (err) return done(err);

//           expect(res.body.result).to.not.exist;
//           expect(res.body.error).to.exist;
//           expect(res.body.error).to.eql("unauthorized");

//           const allArticles = await Article.find();
//           const updatedArticle = await Article.findOne({
//             title: "Hello World",
//           });

//           expect(allArticles.length).to.eql(storedArticles.length);
//           expect(updatedArticle).to.not.exist;

//           done();
//         });
//     });
//   });

//   /*

//   12-4. [MongoDB] Deleting an article

//   */
//   describe("DELETE /articles/:article_id", () => {
//     beforeEach(fetchAllArticles);
//     afterEach(deleteAllArticles);

//     it("should delete existing article", (done) => {
//       const userId = USERS[0].id;
//       const articleId = storedArticles[0]._id;

//       request(app)
//         .get(`/users/${userId}/token`)
//         .end((err, res) => {
//           if (err) return done(err);

//           request(app)
//             .delete(`/articles/${articleId}`)
//             .set("VC-CLIENT-TOKEN", res.body.token)
//             .expect(200)
//             .end(async (err, res) => {
//               if (err) return done(err);

//               expect(res.body.result).to.exist;
//               expect(res.body.result).to.eql("ok");
//               expect(res.body.article).to.not.exist;

//               const allArticles = await Article.find();
//               const deletedArticle = await Article.findOne({ _id: articleId });

//               expect(allArticles.length).to.eql(storedArticles.length - 1);
//               expect(deletedArticle).to.not.exist;

//               done();
//             });
//         });
//     });

//     it("should respond with error if invalid id is given", (done) => {
//       const userId = USERS[0].id;
//       const articleId = "invalid-article-id";

//       request(app)
//         .get(`/users/${userId}/token`)
//         .end((err, res) => {
//           if (err) return done(err);

//           request(app)
//             .delete(`/articles/${articleId}`)
//             .set("VC-CLIENT-TOKEN", res.body.token)
//             .expect(400)
//             .end(async (err, res) => {
//               if (err) return done(err);

//               expect(res.body.result).to.not.exist;
//               expect(res.body.error).to.exist;
//               expect(res.body.error).to.eql("invalid article id");

//               expect(res.body.article).to.not.exist;

//               done();
//             });
//         });
//     });

//     it("should NOT delete article with invalid token", (done) => {
//       const articleId = storedArticles[0]._id;

//       request(app)
//         .put(`/articles/${articleId}`)
//         .set("VC-CLIENT-TOKEN", "whatareyoudoing,faketoken")
//         .expect(401)
//         .end(async (err, res) => {
//           if (err) return done(err);

//           expect(res.body.result).to.not.exist;
//           expect(res.body.error).to.exist;
//           expect(res.body.error).to.eql("unauthorized");

//           const allArticles = await Article.find();
//           const undeletedArticle = await Article.findOne({ _id: articleId });

//           expect(allArticles.length).to.eql(storedArticles.length);
//           expect(undeletedArticle).to.exist;

//           done();
//         });
//     });

//     it("should NOT delete article without token", (done) => {
//       const articleId = storedArticles[0]._id;

//       request(app)
//         .put(`/articles/${articleId}`)
//         .expect(401)
//         .end(async (err, res) => {
//           if (err) return done(err);

//           expect(res.body.result).to.not.exist;
//           expect(res.body.error).to.exist;
//           expect(res.body.error).to.eql("unauthorized");

//           const allArticles = await Article.find();
//           const undeletedArticle = await Article.findOne({ _id: articleId });

//           expect(allArticles.length).to.eql(storedArticles.length);
//           expect(undeletedArticle).to.exist;

//           done();
//         });
//     });
//   });
// });
