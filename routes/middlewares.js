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

    const problem = sample_problems.find((el) => {
        return el.id === Number(req.params.problem_id)
    });

    const problemTestList = problem.tests;

    try {
        new vm.Script(req.body.submitValue);
    } catch (err) {
        if (err) {
            return res.render('failure', {
                failmessage: err,
                error: err.stack
            })
        }
    }

    const script = new vm.Script(req.body.submitValue);

    let contexts = [{}];

    contexts.forEach((context) => {
        script.runInNewContext(context);
    });

    let solutionFn = Object.keys(contexts[0])[0];

    let testValue = [];

    for (let i = 0; i < problemTestList.length; i++) {
        const sandbox = {};
        let changeTestValue = vm.runInNewContext(problemTestList[i].code, sandbox);
        testValue.push([changeTestValue, problemTestList[i].solution]);
    }

    for (let i = 0; i < testValue.length; i++) {
        try {
            contexts[0][solutionFn](testValue[i][0])
        } catch (err) {
            return res.render('failure', {
                failmessage: err,
                error: err.stack
            })
        }
        if (contexts[0][solutionFn](testValue[i][0]) !== testValue[i][1]) {
            return res.render('failure', {
                failmessage: `${solutionFn}(${testValue[i][0]})결과값은 
                ${contexts[0][solutionFn](testValue[i][0])}이 아니라 
                ${testValue[i][1]}어야 합니다`,
                error: ''
            });
        }
    }
    next();
}
