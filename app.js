const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require("body-parser");

app.use(express.static('public'));

// Set view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Define routes
app.get('/', function(req, res){
	res.render('index');
});

app.get('/register', function(req, res){
	res.render('register');
});

app.get('/home', function(req, res){
	res.render('home');
});

// middleware to parse post forms
app.use(bodyParser.urlencoded({ extended: false }));    //for reading post forms


const userRouter = require('./routes/users');
app.use('/users', userRouter);

const processFormRouter = require('./routes/processForm');
app.use('/processForm', processFormRouter);


app.listen(8038, () => {
	console.log('Server started on port: 8038');
});








/*var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
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

module.exports = app;*/
