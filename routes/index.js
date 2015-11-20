'use strict';

var express = require('express');
var router = express.Router();

var User = require('../models/user');
var Item = require('../models/items');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Welcome To Twitter' });
});

router.get('/register', function(req, res){
  res.render('register', {title: 'Register'});
});

router.get('/login', function(req, res){
  res.render('login', {title: "Login"});
})

router.post('/market', function(req, res) {
  Item.find({username: req.body.username}, function(err, item) {
    console.log('item',item);
    res.status(err ? 400 : 200).send(err || item);
  })
})

router.get('/market', function(req, res){
  console.log('get:', req.body)
  res.render('market', {title: "Market"});
})

module.exports = router;
