var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var minifyHTML = require('express-minify-html');
var compress = require('compression');

var routes = require('./routes/index');

var app = express();


// view engine setup
app.use(compress());
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
app.use(minifyHTML({
    override:      true,
    htmlMinifier: {
        removeComments:            true,
        collapseWhitespace:        true,
        collapseBooleanAttributes: true,
        removeAttributeQuotes:     true,
        removeEmptyAttributes:     true,
        minifyJS:                  true
    }
}));


/*Leverage browser
app.use(function(req, res, next) {
    //res.header("ExpiresByType image/x-icon", "access plus 1 year");
    res.header("ExpiresByType application/javascript", "access plus 1 year");
    next();
});
app.use(express.static(__dirname + '/public', { maxAge: 86400000 })); //__dirname + '/public', { maxAge: oneYear }
*/

app.use(function(req, res, next) {
    if (!res.getHeader('Cache-Control')) {
        res.setHeader('Cache-Control', 'public, max-age=' + (31557600000 / 1000)); //one year?
    } 
    return next();
});

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
