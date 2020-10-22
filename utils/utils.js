const Problem = require('../routes/models/Problem');

async function save() {
  const fs = require('fs')
  let rawdata = fs.readFileSync('./models/sample_problems.json');
  let problems = JSON.parse(rawdata);

  try {
    for (let i = 0; i < problems.length; i++) {
      await Problem(problems[i]).save();
    }
  } catch (err) {
    console.error(err);
  }
}
