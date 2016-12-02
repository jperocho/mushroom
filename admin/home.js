'use strict';
var AdminRoute     = require('express').Router();
var passport   = require('passport');
var csrf       	= require('csurf');

var csrfProtection = csrf({ cookie:true });
var EndpointSchema = require('../models/endpoint');
var isLoggedIn 	= require('../helpers/').isLoggedIn;


AdminRoute
	.get('/', isLoggedIn,  csrfProtection, function(req, res) {
		var endpoints = EndpointSchema.find({},{_id:0}).exec();

		endpoints
			.then(datas => {

				res.render('index', {
					csrfToken: req.csrfToken(),
					endpoints: datas
				});

			})
			.catch(e => {
				console.log(e);
			})
	})



module.exports = AdminRoute;