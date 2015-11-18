'use strict';

var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Welcome To Twitter' });
});

router.get('/register', function(req, res){
  res.render('register', {title: 'Register'});
});

router.get('/login', function(req, res){
  res.render('login', {title: "Login"});
})

router.get('/profile', function(req, res){
  res.render('profile');
})

module.exports = router;
