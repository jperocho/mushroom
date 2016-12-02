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
	.get('/resource/:endpointId', isLoggedIn, csrfProtection, (req, res) => {
		var endpoint = EndpointSchema.find({id:req.params.endpointId}).limit(1).exec();

		endpoint
			.then((data) => {
				data = data[0]
				res.render('endpoint-edit', { csrfToken: req.csrfToken(), data:data });
			})
			.catch((err) => console.log(err))

	})

	.get('/resource', isLoggedIn, csrfProtection, (req, res) => {
		res.render('endpoint-new', { csrfToken: req.csrfToken() });
	})



module.exports = AdminRoute;