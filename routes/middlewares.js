exports.isLoggedIn = (req, res, next) => {
    console.log(req.isAuthenticated())
    console.log(req.session);
    if(req.isAuthenticated()) {  
        next();
    } else {
        res.redirect('/login');
    }
}
