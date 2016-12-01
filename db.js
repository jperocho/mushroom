'use strict';
var mongoose = require('mongoose');

/*
 * configuration file
 */
var conf = require('./config');



module.exports = {
	init: () => {
		mongoose.Promise = require('bluebird');
		mongoose.connect(conf.db);
	},

	collection: function(endpoint) {
		return mongoose.connection.db.collection(endpoint)
	}
}


