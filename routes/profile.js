'use strict';

var express = require('express');
var router = express.Router();

var User = require('../models/user');
var Item = require('../models/items');

// var authMiddleware = require('../config/auth');

// router.get('/profile', authMiddleware, function(req, res) {
//   res.render('profile', {title: 'Make Your Profile Standout'})
// });

router.post('/', function(req, res){
  User.findById(req.body._id, function(err, updatedUser){
    res.status(err ? 400 : 200).send(err || updatedUser);
  })
});

// router.get('/', function(req, res){
//   res.render('profile');
// });

router.get('/edit', function(req, res){
  res.render('profileedit');
});

router.put('/', function(req, res){
  User.findByIdAndUpdate(req.body._id, req.body, function(err, user){
    res.status(err ? 400 : 200).send(err || user);
  })
});

router.post('/newitem', function(req, res){
  let item = new Item(req.body);
  item.save(err => {
    res.status(err ? err : 200).send(err || item);
  });
});

router.get('/newitem', function(req, res) {
  Item.find({}, (err, items) => {
    console.log('items ', items.length);
    // res.status(err ? 400 : 200);
    res.render('profile', {items: items});
  });
});

module.exports = router;

// User.findOne({username: username}, function(err, user){

// router.post('/login', function(req, res) {
//   User.authenticate(req.body, function(err, user){
//     res.cookie('username', user.username);
//     res.cookie('userId', user._id.toString());
//     res.status(err ? 400 : 200).send(err || user);
//   });
// });
