'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let Item;

let itemSchema = Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true},
  description: { type: String, required: true },
 });

Item = mongoose.model('Item', itemSchema);

module.exports = Item;