'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var idCounterSchema = new Schema({
	name: {type:String},
	seq: {type: Number, default: 0}
});

idCounterSchema.statics.setCounter = function(name, cb) {
		return this.findOneAndUpdate({name: name}, {$inc: { seq: 1} }, {new: true, upsert: true},cb);
}


module.exports = mongoose.model('idCounter', idCounterSchema);