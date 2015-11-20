'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Item;

var itemSchema = mongoose.Schema({
  name: { type: String, required: false },
  price: { type: Number, required: false},
  description: { type: String, required: false },
  canExchange: {type: Boolean, default: true, required: true},
  isPending: {type: Boolean, default: false, required: true},
  userId: {type: mongoose.Schema.ObjectId, ref: 'User', required: true},
  username: {type: String, required: false}
});

itemSchema.methods.exchange = function(exchangeItem, cb){
  var placeholder = this.userId;
  this.userId = exchangeItem.userId;
  exchangeItem.userId = placeholder;
  this.isPending = exchangeItem.isPending = false;
  this.canExchange = exchangeItem.canExchange = false;
  this.save(function(){
    exchangeItem.save(cb);
  });
};  


Item  = mongoose.model('Item', itemSchema);
module.exports = Item; 