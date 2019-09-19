const Problems = require('../../models/Problem');
const sampleProblems = require('../../models/sample_problems.json');

exports.loadMain = async (req, res, next) => {
  try {
    for (let i = 0; i < sampleProblems.length; i++) {
      if (await Problems.exists({ title: sampleProblems[i].title })) {
        await Problems.updateOne(
          { title: sampleProblems[i].title },
          {
            difficulty_level: sampleProblems[i].difficulty_level,
            description: sampleProblems[i].description,
            tests: sampleProblems[i].tests
          }
        );
      } else {
        await new Problems(sampleProblems[i]).save();
      }
    }
    const allProblems = await Problems.find();

    res.render('index', { title: 'Vanilla', user: req.user, problems: allProblems });
  } catch(err) {
    res.status(500).send({ error: 'internal server error' });
  }
};
