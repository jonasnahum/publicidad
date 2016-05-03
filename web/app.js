var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var UglifyJS = require("uglify-js");

var routes = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


var result = UglifyJS.minify([ "public/angular/lib/angular.js", "public/angular/lib/angular-route.min.js", "public/angular/lib/dirPagination.js","public/angular/lib/angular-messages.js","public/js/grayscale.js", "public/js/jquery.js", "public/js/lightbox.js","public/js/jquery-ui.js","public/angular/src/modelFactory.js","public/angular/src/mapFactory.js","public/angular/src/proxyFactory.js","public/angular/src/editarController.js","public/angular/src/nuevoPublicoController.js","public/angular/src/app.js",  ]);
console.log(result.code);


app.use('/', routes);

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
