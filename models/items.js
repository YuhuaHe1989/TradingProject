'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let Item;

let itemSchema = Schema({
  name: { type: String, required: false },
  price: { type: Number, required: false},
  description: { type: String, required: false },
 });

Item = mongoose.model('Item', itemSchema);

module.exports = Item;