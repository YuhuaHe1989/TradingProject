'use strict';

var PORT = process.env.PORT || 4000;

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var mongoUrl = process.env.MONGOLAB_URI || 'mongodb://localhost/ecommerce';

var mongoose = require('mongoose');
mongoose.connect(mongoUrl, function(err){
  if(err) return console.log("Error connecting to Mongodb:", err);
  console.log('Connected to MongoDB:', mongoUrl);
}); 

var app = express();

// view engine setup
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('public'));

app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/profile', require('./routes/profile'));

// catch 404 and forward to error handler
app.use(function(req, res) {
  res.status(404).render(404);
});

app.listen(PORT, function(){
  console.log("Listening on port ", PORT);
})