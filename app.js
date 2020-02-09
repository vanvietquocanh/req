var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');
var schedule = require('node-schedule');

var requestSSH = require("./routes/module/requestSSH");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dashboardRouter = require('./routes/dashboard');
var proxyListRouter = require('./routes/proxyList');
var addProxyRouter = require('./routes/addProxy');
var removeProxyRouter = require('./routes/removeProxy');
var postTestRouter = require('./routes/post.test');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

// var k = schedule.scheduleJob('00 00 12 * * 1-7', function(){
   requestSSH();
// });

app.use('/', indexRouter);
app.use('/test', postTestRouter);
app.use('/dashboard', dashboardRouter);
app.use('/proxy-list', proxyListRouter);
app.use('/add-proxy', addProxyRouter);
app.use('/remove-proxy', removeProxyRouter);
app.use('/users', usersRouter);

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
  res.render('error');
});

module.exports = app;
