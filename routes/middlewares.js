const util = require('util');
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

    let sulutionFn = Object.keys(contexts[0])[0];

    let testValue = [];

    for (let i = 0; i < problemTestList.length; i++) {
        const sandbox = {};
        let changeTestValue = vm.runInNewContext(problemTestList[i].code, sandbox);
        testValue.push([changeTestValue, problemTestList[i].solution]);
    }

    for (let i = 0; i < testValue.length; i++) {
        if (contexts[0][sulutionFn](testValue[i][0]) !== testValue[i][1]) {
            res.render('failure');
        }
    }
    next();
}
