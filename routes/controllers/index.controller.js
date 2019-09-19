const passport = require('passport');
const User = require('../../models/User');
const Problem = require('../../models/Problem');

exports.getProblemList = async (req, res, next) => {
  res.clearCookie('writtenCode');
  try {
    const currentUser = await User.findOne({ _id : req.user._id });
    const problems = await Problem.find();
    const successList = currentUser.success_problems.map(problem => {
      return problem.problem_id;
    });

    res.render('index', {
      title: '바닐라코딩',
      problems,
      userProfileImg: currentUser.profile_img_url,
      userName: currentUser.username,
      successList,
      userChallenging: problems.length - successList.length
    });
  } catch (error) {
    if (error.name === 'CastError') {
      next();
    } else {
      error.status = 500;
      next(error);
    }
  }
};

exports.getLoginPage = (req, res, next) => {
  res.render('login', { title: '바닐라코딩' });
};

exports.gitHubLogin = passport.authenticate('github');

exports.gitHubLoginCallback = passport.authenticate('github', {
  failureRedirect: '/login',
  successRedirect: '/'
});

exports.doLogout = (req, res, next) => {
  req.logout();
  res.status(301).redirect('/login');
};


/*
id가 잘못되었을 때,
MongooseError [CastError]: Cast to ObjectId failed for value "123" at path "_id" for model "User"
    at new CastError (/Users/hanjunpark/Documents/vanillacoding/bootcamp/week11/codewars/node_modules/mongoose/lib/error/cast.js:29:11)
    at ObjectId.cast (/Users/hanjunpark/Documents/vanillacoding/bootcamp/week11/codewars/node_modules/mongoose/lib/schema/objectid.js:244:11)
    at ObjectId.SchemaType.applySetters (/Users/hanjunpark/Documents/vanillacoding/bootcamp/week11/codewars/node_modules/mongoose/lib/schematype.js:948:12)
    at ObjectId.SchemaType._castForQuery (/Users/hanjunpark/Documents/vanillacoding/bootcamp/week11/codewars/node_modules/mongoose/lib/schematype.js:1362:15)
    at ObjectId.SchemaType.castForQuery (/Users/hanjunpark/Documents/vanillacoding/bootcamp/week11/codewars/node_modules/mongoose/lib/schematype.js:1352:15)
    at ObjectId.SchemaType.castForQueryWrapper (/Users/hanjunpark/Documents/vanillacoding/bootcamp/week11/codewars/node_modules/mongoose/lib/schematype.js:1331:15)
    at cast (/Users/hanjunpark/Documents/vanillacoding/bootcamp/week11/codewars/node_modules/mongoose/lib/cast.js:307:32)
    at model.Query.Query.cast (/Users/hanjunpark/Documents/vanillacoding/bootcamp/week11/codewars/node_modules/mongoose/lib/query.js:4638:12)
    at model.Query.Query._castConditions (/Users/hanjunpark/Documents/vanillacoding/bootcamp/week11/codewars/node_modules/mongoose/lib/query.js:1834:10)
    at model.Query.<anonymous> (/Users/hanjunpark/Documents/vanillacoding/bootcamp/week11/codewars/node_modules/mongoose/lib/query.js:2089:8)
    at model.Query._wrappedThunk [as _findOne] (/Users/hanjunpark/Documents/vanillacoding/bootcamp/week11/codewars/node_modules/mongoose/lib/helpers/query/wrapThunk.js:16:8)
    at /Users/hanjunpark/Documents/vanillacoding/bootcamp/week11/codewars/node_modules/kareem/index.js:369:33
    at processTicksAndRejections (internal/process/task_queues.js:75:11) {
  message: 'Cast to ObjectId failed for value "123" at path "_id" for model "User"',
  name: 'CastError',
  stringValue: '"123"',
  kind: 'ObjectId',
  value: 123,
  path: '_id',
  reason: undefined,
  model: Model { User }
}

connection이 잘못 되었을 때,
connection error: Error: connect ECONNREFUSED 127.0.0.1:2707
    at TCPConnectWrap.afterConnect [as oncomplete] (net.js:1056:14) {
  name: 'MongoNetworkError',
  errorLabels: [ 'TransientTransactionError' ],
  [Symbol(mongoErrorContextSymbol)]: {}
}
(node:12553) UnhandledPromiseRejectionWarning: Error: connect ECONNREFUSED 127.0.0.1:2707
    at TCPConnectWrap.afterConnect [as oncomplete] (net.js:1056:14)
(node:12553) UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). (rejection id: 1)
(node:12553) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.


*/