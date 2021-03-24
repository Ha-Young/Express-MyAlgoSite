const Problem = require('../models/Problem');
const AppError = require('../utils/appError');
const catchAsync = require('../middlewares/catchAsync');

exports.get = catchAsync(async (req, res, next) => {
  //질문: db에 저장될 때 _id란 objectId로 이미 식별자랑 함께 저장되는데
  //id가 필요한 이유가 무엇인가
  const problem = await Problem.findById(req.params.id).lean();

  if (problem === null) {
    return next(new AppError('No problem found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      problem
    }
  });
});

exports.post = catchAsync(async (req, res, next) => {
  /*
  클라이언트로부터 제출받은 코드 정보를 데이터베이스의 정답 코드를 이용하여 정답이 모두 일치하는지 판별하고 아래와 같은 형식으로 대응해주세요.

 제출된 코드가 테스트를 모두 통과했을 경우, success.ejs 템플릿을 생성하여 축하 메시지를 보여주세요. 그리고 다시 문제 리스트 화면으로 이동할 수 있는 링크도 보여주세요.

 제출된 코드가 테스트를 모두 통과하지 못했을 경우, failure.ejs 템플릿을 생성하여 결과를 보여주세요. 어떤 테스트가 통과하지 못하였는지에 대한 설명도 보여주세요.

 제출된 코드로 인한 실행 오류가 발생했을 경우, failure.ejs 템플릿을 보여주어야 하고 어떤 오류가 발생했는지 상세히 표기해주어야 합니다.

 그 이외에 서버 내부적인 코드 실행 오류가 발생했을 경우, error.ejs를 이용하여 사용자에게 오류 메시지를 보여주세요.

 사용자가 제출한 코드를 실행하는 방법에 대해서 깊이 고민해보시기 바랍니다.
  */
  const solution = req.body;
  res.status(201).json({ result: "ok", solution });
});
