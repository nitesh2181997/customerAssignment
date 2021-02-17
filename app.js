var createError = require('http-errors');
var express = require('express');
var passport = require('passport');
require('dotenv').config()
require('./models/db');
require('./config/passport');
var routesApi = require('./route/index');

var app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());

// [SH] Use the API routes when path starts with /api
app.use('/', routesApi);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  //res.render('error');
});

module.exports = app;