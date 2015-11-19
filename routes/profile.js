'use strict';

var express = require('express');
var router = express.Router();

var User = require('../models/user');
var Item = require('../models/items');

// var authMiddleware = require('../config/auth');

// router.get('/profile', authMiddleware, function(req, res) {
//   res.render('profile', {title: 'Make Your Profile Standout'})
// });

// router.post('/', function(req, res){
//   User.findById(req.body._id, function(err, updatedUser){
//     res.status(err ? 400 : 200).send(err || updatedUser);
//   })
// });

router.get('/edit', function(req, res){
  res.render('profileedit');
});

// router.put('/', function(req, res){
//   User.findByIdAndUpdate(req.body._id, req.body, function(err, user){
//     res.status(err ? 400 : 200).send(err || user);
//   })
// });

router.post('/', function(req, res){
  console.log(req.body);
  let item = new Item(req.body);
  item.save(err => {
    res.status(err ? err : 200).send(err || item);
  });
});

router.get('/', function(req, res){
  Item.find({}, function(err, items) {
    console.log('items ', items);
    res.render('profile', {items: items});
  })
});

module.exports = router;

