'use strict';
var app = require('./app')
var http = require('http')

/*
 * configuration file
 */
var conf = require('./config');

http.createServer(app).listen(conf.port)
// app.listen(conf.port);