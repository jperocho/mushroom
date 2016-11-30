'use strict';
var express = require('express');
var mongoose = require('mongoose');


var app = express();

mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/mushapi');
var mongodb = mongoose.connection.db;

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

app.get('/api/v2/:endpoint',(req,res) => {
	mongodb.collection(req.params.endpoint).find({}).toArray(function(err,endpoint) {
		if (err)
			console.log(err);

		res.json(endpoint);
	})

})


app.get('/', (req,res) => {
	Endpoint.findOne({})
		.then( (doc) => {
			res.send(doc);
		})
		.catch( e => console.log(e) );
})

app.post('/endpoint', (req,res) => {
	mongodb.collection('profile-info').insert({
		name: 'profile-info',
		url: '/profile-info',
		fields: [
			{name: 'String'},
			{address: 'String'}
		]
	})
})



app.listen(3000);