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
var nodemailer = require('nodemailer');

db.connect('mongodb://localhost/paginas');


var routes = require('./routes/index');
var imagenesApi = container.get("imagenesController");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// default options, immediately start reading from the request stream and parsing 
app.use(busboy({inmediate: true}));

app.use('/', routes);
app.use('/imagenes/api', imagenesApi.router);
app.post('/correo', function (req, res, next) {
  console.log(req.body);
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'jonasnahum@gmail.com',
        pass: 'jonasoctubre'
    }
  });    
  transporter.sendMail({
    from: req.body.from,
    to: 'jonasnahum@gmail.com',
    subject: req.body.subject,
    text: req.body.text
  });
  console.log('Correo enviado ');
  res.send({data: "ok"});
});


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
