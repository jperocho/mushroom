'use strict';
var express = require('express');
var mongoose = require('mongoose');


var app = express();

mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/mushapi');

var Endpoint = require('./models/endpoint');

var ep = Endpoint.find({}).exec();

ep.then( (result) => {
	// console.log(result.length);
	for (var i = result.length - 1; i >= 0; i--) {
		app.get(result[i].url, (req,res) => {
			res.json('working');
		})

	}
})
.catch( (err) => console.log(err) )


app.get('/', (req,res) => {
	Endpoint.findOne({})
		.then( (doc) => {
			res.send(doc);
		})
		.catch( e => console.log(e) );
})

app.post('/', (req,res) => {
	var endpoint = new Endpoint({
		name: 'test',
		url: '/test',
		fields: [
			{name: 'String'}
		]
	})

	endpoint.save((err,data) => {
		if (err) console.log();
		res.json(data);
	});
})



app.listen(3000);