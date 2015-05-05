var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');

mongoose.connect('mongodb://localhost:27017/test', function (err) {
    if (err) {
        console.log(err);
    }
});

var routes = require('./routes/index');
var users = require('./routes/users');
var comments = require('./routes/models/comments');
var events = require('./routes/models/events');
var organizations = require('./routes/models/organizations');
var staffs = require('./routes/models/staffs');
var doctors = require('./routes/models/doctors');
require('./config/passport')(passport);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('regisOp'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({cookie: { maxAge: 6000000 }}));
app.use(flash());

// required for passport
app.use(session({ secret: 'regisOpSecretKey' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash());

app.use('/', routes);
app.use('/users', users);
app.use('/comments', comments);
app.use('/events', events);
app.use('/organizations', organizations);
app.use('/staffs', staffs);
app.use('/doctors', doctors);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
