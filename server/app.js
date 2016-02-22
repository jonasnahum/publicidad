var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var busboy = require('connect-busboy');
var container = require('./src/container');
var cors = require('cors');
var db = container.get('dbConnection');

db.connect(process.env.CONNECTION_STRING || 'mongodb://localhost/paginaWeb');

var routes = require('./routes/index');
var paginaWebApi = container.get("paginaWebController");
var usuarioApi = container.get("usuarioController");
var correoApi = container.get("correoController")
var corsOptions = {  //This is CORS-enabled for only origin: process.env.WEB || 'http://localhost:3000'
  origin: process.env.WEB || 'http://localhost:3001'
};

var app = express();
//app.set('jwtTokenSecret', 'cualquierClave');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// default options, immediately start reading from the request stream and parsing 
app.use(busboy({inmediate: true}));

app.use('/', routes);
app.use('/paginaWeb/api', paginaWebApi.router);
app.use('/usuario/api', usuarioApi.router);
app.use('/correo', correoApi.router);

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
