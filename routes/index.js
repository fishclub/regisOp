var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
   res.render('index', { title: 'Express', message: req.flash('success')});
});

router.get('/helloworld', isLoggedIn, function(req, res) {
    res.render('helloworld', { title: 'Hello, World!' })
});

router.get('/testmsg', function(req, res){
	req.flash('test', 'it worked');
  	res.send(JSON.stringify(req.flash('test')));
});

router.get('/signup', function(req, res) {
    res.render('signup', { message: req.flash('signupMessage') });
});

router.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/profile', 
    failureRedirect : '/signup', 
    failureFlash : true 
}));

router.get('/login', function(req, res) {
    res.render('login', { message: req.flash('loginMessage') }); 
});

router.post('/login', passport.authenticate('local-login', {
    successRedirect : '/doctors/listdoctor',
    failureRedirect : '/login', 
    failureFlash : true
}));

router.get('/profile', isLoggedIn, function(req, res) {
	res.render('profile', {
	    user : req.user,
        message: req.flash('loginMessage')
	});
});

router.get('/logout', function(req, res) {
    req.logout();
    req.flash('success', 'Logout success');
    res.redirect('/');
});


router.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

// handle the callback after facebook has authenticated the user
router.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect : '/profile',
        failureRedirect : '/'
    }));

// route for logging out
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    req.flash('loginMessage', 'Please login or signup');
    res.redirect('/login');
}

module.exports = router;
