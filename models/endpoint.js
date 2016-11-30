'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var endpoint = new Schema({
	endpoint: [Schema.Types.Mixed]
}, {strict: false});

module.exports = mongoose.model('endpoint', endpoint);