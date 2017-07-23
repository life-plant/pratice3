var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs=require('ejs');
var users = require('./routes/users');
var index =require('./routes/index');
var test =require('./routes/test');
var app = express();


//var engines = require('consolidate');
//app.engine('jade', engines.jade);
//app.engine('html', engines.ejs);
// or use these
// app.engine('jade', require('jade').__express);
// app.engine('html', require('ejs').renderFile);
//app.set('view engine', 'jade');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//app.engine('jade', require('jade').__express);
//app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));//与下一行相等

app.use(express.static('./public'))//这里也有改，设置静态文件目录

app.use('/in', index);
app.use('/users', users);
app.use('/test', test);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
