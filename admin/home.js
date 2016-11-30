'use strict';
var AdminRoute     = require('express').Router();
var passport   = require('passport');
var csrf       	= require('csurf');

var csrfProtection = csrf({ cookie:true });
var EndpointSchema = require('../models/endpoint');
// var db           = require('../db');
var isLoggedIn 	= require('../helpers/').isLoggedIn;

// mongoose.Promise = require('bluebird');
// mongoose.connect(conf.db);


AdminRoute
	.get('/', isLoggedIn,  csrfProtection, function(req, res) {
		res.render('index', { csrfToken: req.csrfToken() });
	})

	.post('/', isLoggedIn,  csrfProtection, function(req, res) {
		var newEndpoint = {
			title: req.body.title,
			slug: req.body.slug,
		}

		if (req.body.fieldType.length) {
			newEndpoint.fields = [];
			for (var i = req.body.fieldType.length - 1; i >= 0; i--) {
				var field = {};
				field[req.body.fieldName[i]] = req.body.fieldType[i];
				newEndpoint.fields.push(field)
			}
		}

		var endpoint = new EndpointSchema(newEndpoint);

		endpoint.save(function(err,doc){
			if (err)
				console.log(err);

			res.json(doc);
		})
	})



module.exports = AdminRoute;