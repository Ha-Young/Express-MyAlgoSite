const vm = require('vm');
const sample_problems = require('../models/sample_problems.json');

exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/login');
    }
}

exports.isSeccesss = (req, res, next) => {

    const problem = sample_problems.filter((el) => {
        return el.id === Number(req.params.problem_id)
    })[0];

    const problemTestList = problem.tests;

    const script = new vm.Script(req.body.submitValue);

    let contexts = [{}];

    contexts.forEach((context) => {
        script.runInNewContext(context);
    });

    console.log(problemTestList)
    console.log(contexts);

    if (true) {
        next();
    } else {
        res.render('failure');
    }
}
