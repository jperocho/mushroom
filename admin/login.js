'use strict';
var AdminRoute     = require('express').Router();
var passport   = require('passport');

AdminRoute
.get('/login', (req,res) => {
	res.render('login');
})
module.exports = AdminRoute;