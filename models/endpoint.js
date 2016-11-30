'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var IdCounter = require('./id-counter');

var endpointSchema = new Schema({
	id: {type: String},
	title: {type: String},
	slug: {type: String},
	fields: [Schema.Types.Mixed]
}, {strict: false});



endpointSchema.pre('save', function(next) {
    var doc = this;

		IdCounter.setCounter('endpointId', (err,id) => {
			if (err)
				console.log(err);

			doc.id = id.seq;
			next();
		})

});

var endpoint = mongoose.model('endpoint', endpointSchema);

module.exports = endpoint;