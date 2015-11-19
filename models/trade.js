'use strict';

var Item = require('../models/item');
var mongoose = require('mongoose');

var exchangeSchema = mongoose.Schema({
  item1: {type: mongoose.Schema.ObjectId, ref: "Item", required: true},
  item2: {type: mongoose.Schema.ObjectId, ref: "Item", required: true},
  user1:｛type: mongoose.Schema.ObjectId, ref:'User'},
  user2: {type: mongoose.Schema.ObjectId, ref:'User'},
});

exchangeSchema.statics.create = function(exchange, cb){
  Item.findById(exchange.item1, function(err, item1){
    Item.findById(exchange.item2, function(err, item2){
      item1.isPending = item2.isPending = true;
      item1.save(function(){
        item2.save(function(){
          exchange.save(function(){
            cb(exchange);
          })
        })
      })
    })
  })
}

exchangeSchema.methods.acceptExchange = function(cb){
  var exchange = this;
  var item2id = this.item2;
  Item.findById(this.item1, function(err, item1){
    Item.findById(item2id, function(err, item2){
      item1.isPending = item2.isPending = false;
      item1.exchange(item2, function(){
        item1.save(function(){
          item2.save(function(){
            exchange.save(cb);
          })
        })
      })
    })
  })
}

exchangeSchema.methods.declineExchange = function(cb){
  var exchange = this;
  var item2id = this.item2;
  Item.findById(this.item1, function(err, item1){
    Item.findById(item2id, function(err, item2){
      item1.isPending = item2.isPending = false;
      item1.save(function(){
        item2.save(function(){
          exchange.save(cb)
        })
      })
    })
  })
}

module.exports = mongoose.model('Exchange', exchangeSchema);






