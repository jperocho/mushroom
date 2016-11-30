'use strict';
var AdminRoute     = require('express').Router();
var passport   = require('passport');

var isLoggedIn 	= require('../helpers/').isLoggedIn;

AdminRoute
	.get('/', isLoggedIn, function(req, res, next) {
		res.render('index');
	})

module.exports = AdminRoute;