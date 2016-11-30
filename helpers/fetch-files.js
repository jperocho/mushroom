'use strict'
var fs = require('fs');
module.exports =	function(path,cb) {
	fs.readdirSync(path).forEach(function(file){
	  if (file.match(/\.js$/) !== null && file !== 'index.js') {
	    var name = file.replace('.js', '').replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
	    cb(name)
	  }
	})
};

