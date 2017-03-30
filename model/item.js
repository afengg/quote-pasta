'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Create instance of the schema
var ItemsSchema = new Schema({
	author: String,
	quote: String,
	tags: [String]
});

//export
module.exports = mongoose.model('Item', ItemsSchema);