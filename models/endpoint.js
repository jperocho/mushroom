'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var endpointSchema = new Schema({
	id: { type: Number, required: true, default: 0},
	endpoint: [Schema.Types.Mixed]
}, {strict: false});

var endpoint = mongoose.model('endpoint', endpointSchema);

endpointSchema.pre('save', function(next) {
    var doc = this;
    endpoint.findOne({}, {}, {sort: {id:-1}}, function(error, id)   {
        if(error)
            return next(error);
        console.log(this);
        next();
    });
});

module.exports = endpoint;