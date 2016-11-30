'use strict';
var AdminRoute     = require('express').Router();
var passport   = require('passport');
var csrf           = require('csurf');

var csrfProtection = csrf({ cookie:true });

AdminRoute
	.get('/login', csrfProtection, function(req, res, next) {
	    if (!req.isAuthenticated())
	    	return next();

	    res.redirect('/');
	},function(req,res){
		res.render('login',{
			csrfToken: req.csrfToken(),
			message: req.flash('loginMessage')
		});
	})

	.post('/login', csrfProtection, function(req,res,next){
		//res.end('data is being processed.');
		next();
	}, passport.authenticate('local-login', {
	  successRedirect : '/', // redirect to the secure profile section
	  failureRedirect : '/login', // redirect back to the signup page if there is an error
	  failureFlash : true // allow flash messages
	}));

module.exports = AdminRoute;