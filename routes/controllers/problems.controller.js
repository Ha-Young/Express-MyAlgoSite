const Problem = require('../../models/Problem');
const vm = require('vm');
const { PROBLEM, SUCCESS, FAILURE } = require('../../constants/index');

exports.getAll = async function(req, res, next) {
  try {
    const problems = await Problem.find().lean();

    return problems.sort((a, b) => Number(a.number) - Number(b.number));
  } catch (err) {
    next(err);
  }
};

exports.getOne = async function(req, res, next) {
  try {
    const result = await Problem.findOne(req.params);

    res.status(200).render(
      PROBLEM,
      {
        number: result.number,
        title: result.title,
        description: result.description,
        tests: result.tests,
      }
    );
  } catch (err) {
    next(err);
  }
};

exports.submitHandler = async function(req, res, next) {
  let problemData;

  try {
    problemData = await Problem.findOne(req.params);
    const { tests } = problemData;

    for (let i = 0; i < tests.length; i++) {
      const { code, solution } = tests[i];

      let answer;

      const info = {
        error: null,
        failureData: {
          code: '',
          answer: '',
          solution: '',
        },
        number: req.params.number,
      };

      try {
        const script = new vm.Script(req.body.code + code);

        answer = script.runInContext(vm.createContext(), { timeout: 2000 });
      } catch (err) {
        info.error = err;

        res.status(200).render(FAILURE, { info });

        return;
      }

      if (answer !== solution) {
        info.failureData.code = code;
        info.failureData.answer = answer;
        info.failureData.solution = solution;

        res.status(200).render(FAILURE, { info });

        return;
      }
    }

    if (
      !problemData.completed_users
        .includes(req.user._id)
    ) {
      problemData.completed_users.push(req.user._id);
      problemData.completed_user_number++;

      try {
        await Problem.findOneAndUpdate(
          req.params,
          problemData,
          { new: true }
        );
      } catch (err) {
        next(err);
      }
    }

    res.status(200).render(SUCCESS);
  } catch (err) {
    next(err);
  }
};
