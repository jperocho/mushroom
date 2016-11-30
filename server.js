'use strict';
var express = require('express');
var mongoose = require('mongoose');

var app = express();
mongoose.connect('mongodb://localhost/mushapi');

var Endpoint = require('./models/endpoint');

app.get('/',function(req,res){
	res.json('it works');
})

app.post('/',function(req,res){
	var endpoint = new Endpoint({
		endpoint: 'test'
	})

	endpoint.save(function(err,data){
		if (err) console.log();

		res.json(data);
	});
})



app.listen(3000);