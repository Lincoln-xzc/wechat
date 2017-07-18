var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs = require('ejs');

//var routes = require('./routes/index');
//var users = require('./routes/users');

var session = require('express-session');
var fs = require('fs');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
/*app.engine('.html', ejs.__express);
 app.set('view engine', 'html');*/

app.set('routes', __dirname + '/routes/');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/*app.use('/', routes);
 app.use('/users', users);*/

//配置session
app.use(session({
  secret: 'xzc',
  resave: false,
  saveUninitialized: true,
  cookie: {maxAge: 6000*30}
}));

/*代理*/
var routes = app.get('routes');

fs.readdirSync(routes).forEach(function(filename){
  var filePath = routes + filename;
  var routeName = filename.substr(0, filename.lastIndexOf('.'));
  if(!fs.lstatSync(filePath).isDirectory()){
    app.use('/api', require(filePath));
  }
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
    /*res.render('error', {
      message: err.message,
      error: err
    });*/
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  /*res.render('error', {
    message: err.message,
    error: {}
  });*/
});


module.exports = app;
